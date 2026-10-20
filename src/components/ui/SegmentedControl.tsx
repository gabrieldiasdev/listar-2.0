import { cn } from '@/lib/cn'

interface SegmentedControlProps<T extends string> {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({ label, value, options, onChange }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-1 rounded-2xl bg-slate-200 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'min-h-12 rounded-xl font-semibold transition-colors',
            value === option.value ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-600',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
