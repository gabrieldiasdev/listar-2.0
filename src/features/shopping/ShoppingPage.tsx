import { PartyPopper } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { SettingsLink } from '@/components/SettingsLink'
import { Button } from '@/components/ui/Button'
import { buttonClassName } from '@/components/ui/buttonStyles'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { useHousehold } from '@/features/household/householdContext'
import { groupBySection } from '@/features/items/sections'
import { useItemActions } from '@/features/items/useItemActions'
import { compareText } from '@/lib/text'
import { ShoppingRow } from './components/ShoppingRow'

export function ShoppingPage() {
  const { household, items } = useHousehold()
  const actions = useItemActions()

  const { pendingGroups, cartItems, total } = useMemo(() => {
    const needed = items.filter((item) => item.needed)
    return {
      pendingGroups: groupBySection(needed.filter((item) => !item.inCart), household.sections),
      cartItems: needed.filter((item) => item.inCart).sort((a, b) => compareText(a.name, b.name)),
      total: needed.length,
    }
  }, [items, household.sections])

  if (total === 0) {
    return (
      <>
        <PageHeader title="Mercado" actions={<SettingsLink />} />
        <EmptyState
          icon={PartyPopper}
          title="Nada para comprar"
          description="Quando alguém marcar um item na aba Casa, ele aparece aqui."
          action={
            <Link to="/casa" className={buttonClassName({ size: 'lg' })}>
              Ir para a lista da casa
            </Link>
          }
        />
      </>
    )
  }

  const progress = Math.round((cartItems.length / total) * 100)

  return (
    <>
      <PageHeader
        title="Mercado"
        subtitle={`${cartItems.length} de ${total} no carrinho`}
        actions={<SettingsLink />}
      >
        <div
          role="progressbar"
          aria-label="Itens no carrinho"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-3 overflow-hidden rounded-full bg-slate-200"
        >
          <div className="h-full rounded-full bg-brand-600 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      </PageHeader>

      <div className="px-4 pb-20">
        {pendingGroups.map((group) => (
          <section key={group.section} className="mb-6">
            <h2 className="mb-2 px-1 text-sm font-bold tracking-wide text-slate-500 uppercase">{group.section}</h2>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <ShoppingRow key={item.id} item={item} onToggle={() => actions.toggleInCart(item)} />
              ))}
            </ul>
          </section>
        ))}

        {cartItems.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 px-1 text-sm font-bold tracking-wide text-brand-700 uppercase">No carrinho</h2>
            <ul className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <ShoppingRow key={item.id} item={item} onToggle={() => actions.toggleInCart(item)} />
              ))}
            </ul>
          </section>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 bg-gradient-to-t from-slate-50 from-60% px-4 pt-6 pb-3">
          <Button size="lg" block className="mx-auto max-w-2xl shadow-lg" onClick={() => actions.finishShopping(cartItems)}>
            Finalizar compra
          </Button>
        </div>
      )}
    </>
  )
}
