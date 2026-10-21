import { useMemo } from 'react'
import { useToast } from '@/components/toast/toastContext'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { useHousehold } from '@/features/household/householdContext'
import { useI18n } from '@/i18n/i18nContext'
import * as repository from './itemsRepository'
import type { Item, ItemDraft } from './model'

export function useItemActions() {
  const { household, me } = useHousehold()
  const write = useBackgroundWrite()
  const toast = useToast()
  const { t } = useI18n()
  const householdId = household.id

  return useMemo(
    () => ({
      toggleNeeded: (item: Item) => write(repository.setNeeded(householdId, item.id, !item.needed, me.id)),

      toggleInCart: (item: Item) => write(repository.setInCart(householdId, item.id, !item.inCart)),

      add: (draft: ItemDraft) => write(repository.addItem(householdId, draft, me.id)),

      importMany: (drafts: ItemDraft[]) => write(repository.importItems(householdId, drafts, me.id)),

      update: (item: Item, draft: ItemDraft) =>
        write(repository.updateItemFromDraft(householdId, item, draft, me.id)),

      remove: (item: Item) => {
        write(repository.deleteItem(householdId, item.id))
        toast({
          message: t.editor.deleted(item.name),
          action: { label: t.common.undo, onAction: () => write(repository.restoreItems(householdId, [item])) },
        })
      },

      finishShopping: (cartItems: Item[]) => {
        write(repository.finishShopping(householdId, cartItems))
        toast({
          message: t.shopping.finished(cartItems.length),
          action: { label: t.common.undo, onAction: () => write(repository.restoreItems(householdId, cartItems)) },
        })
      },
    }),
    [householdId, me.id, write, toast, t],
  )
}
