import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}

export function PageHeader({ title, subtitle, actions, children }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/95 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center">{actions}</div>}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </header>
  )
}
