import { useId, type ComponentProps } from 'react'
import { cn } from '@/lib/cn'

interface TextFieldProps extends ComponentProps<'input'> {
  label: string
  hint?: string
}

export function TextField({ label, hint, className, id, ...props }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'min-h-14 rounded-xl border border-slate-300 bg-white px-4 text-lg text-slate-900 placeholder:text-slate-400',
          'focus:border-brand-600 focus:outline-3 focus:outline-brand-200',
          className,
        )}
        {...props}
      />
      {hint && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  )
}
