import { ChevronDown } from 'lucide-react'
import { useId, type ComponentProps } from 'react'

interface SelectFieldProps extends ComponentProps<'select'> {
  label: string
  options: string[]
}

export function SelectField({ label, options, id, ...props }: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className="min-h-14 w-full appearance-none rounded-xl border border-slate-300 bg-white pr-12 pl-4 text-lg text-slate-900 focus:border-brand-600 focus:outline-3 focus:outline-brand-200"
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-6 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  )
}
