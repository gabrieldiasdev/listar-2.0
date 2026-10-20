import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <div className="rounded-full bg-brand-50 p-5 text-brand-700">
        <Icon className="size-10" aria-hidden />
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      {description && <p className="max-w-xs text-slate-600">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
