import { useMemo } from 'react'
import { useToast } from '@/components/toast/toastContext'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { useHousehold } from '@/features/household/householdContext'
import * as repository from './itemsRepository'
import type { Item, ItemDraft } from './model'

export function useItemActions() {
  const { household, me } = useHousehold()
  const write = useBackgroundWrite()
  const toast = useToast()
  const householdId = household.id

  return useMemo(
    () => ({
      toggleNeeded: (item: Item) => write(repository.setNeeded(householdId, item.id, !item.needed, me.id)),

      toggleInCart: (item: Item) => write(repository.setInCart(householdId, item.id, !item.inCart)),

      add: (draft: ItemDraft) => write(repository.addItem(householdId, draft, me.id)),

      importMany: (drafts: ItemDraft[]) => write(repository.importItems(householdId, drafts, me.id)),

      update: (item: Item, draft: ItemDraft) => {
        const needed = draft.needed ?? item.needed
        write(
          repository.updateItem(householdId, item.id, {
            name: draft.name.trim(),
            section: draft.section,
            note: draft.note?.trim() ?? '',
            quantity: needed ? (draft.quantity?.trim() ?? '') : '',
            needed,
            inCart: needed && item.inCart,
            flaggedBy: needed ? (item.needed ? item.flaggedBy : me.id) : null,
          }),
        )
      },

      remove: (item: Item) => {
        write(repository.deleteItem(householdId, item.id))
        toast({
          message: `"${item.name}" excluído`,
          action: { label: 'Desfazer', onAction: () => write(repository.restoreItems(householdId, [item])) },
        })
      },

      finishShopping: (cartItems: Item[]) => {
        write(repository.finishShopping(householdId, cartItems))
        const count = cartItems.length
        toast({
          message: `Compra finalizada! ${count} ${count === 1 ? 'item saiu' : 'itens saíram'} da lista.`,
          action: { label: 'Desfazer', onAction: () => write(repository.restoreItems(householdId, cartItems)) },
        })
      },
    }),
    [householdId, me.id, write, toast],
  )
}
