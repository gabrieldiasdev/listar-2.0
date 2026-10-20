import { House, ShoppingCart, type LucideIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'
import { useHousehold } from '@/features/household/householdContext'
import { cn } from '@/lib/cn'

interface Tab {
  to: string
  label: string
  icon: LucideIcon
  badge?: number
}

export function AppLayout() {
  const { items } = useHousehold()
  const neededCount = items.filter((item) => item.needed).length

  const tabs: Tab[] = [
    { to: '/casa', label: 'Casa', icon: House },
    { to: '/mercado', label: 'Mercado', icon: ShoppingCart, badge: neededCount },
  ]

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <main className="flex-1 pb-28">
        <Outlet />
      </main>

      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto flex max-w-2xl">
          {tabs.map(({ to, label, icon: Icon, badge }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-18 flex-col items-center justify-center gap-1 text-sm font-semibold',
                    isActive ? 'text-brand-700' : 'text-slate-500',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={cn('relative rounded-full px-5 py-1', isActive && 'bg-brand-100')}>
                      <Icon className="size-7" aria-hidden />
                      {!!badge && (
                        <span className="absolute -top-1 right-1 min-w-6 rounded-full bg-red-600 px-1.5 text-center text-xs leading-6 text-white">
                          {badge}
                        </span>
                      )}
                    </span>
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
