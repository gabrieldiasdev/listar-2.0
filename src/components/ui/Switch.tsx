import { cn } from '@/lib/cn'

interface SwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-xl bg-slate-100 px-4 text-left text-lg font-semibold text-slate-800"
    >
      {label}
      <span className={cn('relative h-8 w-14 shrink-0 rounded-full transition-colors', checked ? 'bg-brand-600' : 'bg-slate-300')}>
        <span
          className={cn(
            'absolute top-1 left-1 size-6 rounded-full bg-white shadow transition-transform',
            checked && 'translate-x-6',
          )}
        />
      </span>
    </button>
  )
}
