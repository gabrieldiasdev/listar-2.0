import { Check, House, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/cn'

interface MockItem {
  name: string
  detail?: string
  checked?: boolean
}

interface MockSection {
  title: string
  items: MockItem[]
}

interface Screen {
  title: string
  subtitle: string
  activeTab: 'home' | 'shopping'
  sections: MockSection[]
}

const screens: Record<'home' | 'shopping', Screen> = {
  home: {
    title: 'A nossa casa',
    subtitle: '4 produtos para comprar',
    activeTab: 'home',
    sections: [
      { title: 'Frutas e legumes', items: [{ name: 'Bananas', checked: true }, { name: 'Cebolas' }] },
      {
        title: 'Laticínios',
        items: [{ name: 'Leite', detail: '6 pacotes · pedido pela Ana', checked: true }, { name: 'Iogurtes' }],
      },
      { title: 'Mercearia', items: [{ name: 'Arroz', checked: true }, { name: 'Azeite' }, { name: 'Café', checked: true }] },
    ],
  },
  shopping: {
    title: 'Supermercado',
    subtitle: '2 de 4 no carrinho',
    activeTab: 'shopping',
    sections: [
      { title: 'Frutas e legumes', items: [{ name: 'Bananas' }] },
      { title: 'Mercearia', items: [{ name: 'Café' }] },
      {
        title: 'No carrinho',
        items: [
          { name: 'Leite', detail: '6 pacotes', checked: true },
          { name: 'Arroz', checked: true },
        ],
      },
    ],
  },
}

/** Illustrative, non-interactive rendering of the app, so the landing needs no screenshots to stay in sync. */
export function PhoneMockup({ variant, className }: { variant: 'home' | 'shopping'; className?: string }) {
  const screen = screens[variant]
  const isShopping = variant === 'shopping'

  return (
    <div
      aria-hidden
      className={cn(
        'w-64 rounded-[2.5rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/10 sm:w-72',
        className,
      )}
    >
      <div className="flex h-[30rem] flex-col overflow-hidden rounded-[2rem] bg-slate-50 sm:h-[34rem]">
        <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-slate-900" />
        <div className="px-4 pt-3 pb-2">
          <p className="text-lg font-bold text-slate-900">{screen.title}</p>
          <p className="text-xs text-slate-500">{screen.subtitle}</p>
          {isShopping && (
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 rounded-full bg-brand-600" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 overflow-hidden px-3">
          {screen.sections.map((section) => (
            <div key={section.title}>
              <p
                className={cn(
                  'mb-1 px-1 text-[0.6rem] font-bold tracking-wider uppercase',
                  section.title === 'No carrinho' ? 'text-brand-700' : 'text-slate-500',
                )}
              >
                {section.title}
              </p>
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <MockRow key={item.name} item={item} round={isShopping} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 border-t border-slate-200 bg-white py-2 text-[0.6rem] font-semibold">
          <TabIcon icon={House} label="Casa" active={screen.activeTab === 'home'} />
          <TabIcon icon={ShoppingCart} label="Supermercado" active={screen.activeTab === 'shopping'} />
        </div>
      </div>
    </div>
  )
}

function MockRow({ item, round }: { item: MockItem; round: boolean }) {
  const inCart = round && item.checked
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-xl px-2.5 py-2',
        inCart ? 'bg-slate-100' : item.checked ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-white ring-1 ring-slate-100',
      )}
    >
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center border-2',
          round ? 'rounded-full' : 'rounded-md',
          item.checked ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-300',
        )}
      >
        {item.checked && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block text-[0.8rem] leading-tight',
            inCart ? 'text-slate-400 line-through' : item.checked ? 'font-bold text-brand-900' : 'text-slate-700',
          )}
        >
          {item.name}
        </span>
        {item.detail && <span className="block truncate text-[0.6rem] text-slate-500">{item.detail}</span>}
      </span>
    </div>
  )
}

function TabIcon({ icon: Icon, label, active }: { icon: typeof House; label: string; active: boolean }) {
  return (
    <span className={cn('flex flex-col items-center gap-0.5', active ? 'text-brand-700' : 'text-slate-400')}>
      <Icon className="size-4" />
      {label}
    </span>
  )
}
