import { Search, X } from 'lucide-react'
import { useI18n } from '@/i18n/i18nContext'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useI18n()
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 text-slate-400" aria-hidden />
      <input
        type="search"
        aria-label={t.catalog.searchLabel}
        placeholder={t.catalog.searchPlaceholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        enterKeyHint="search"
        className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white pr-14 pl-13 text-lg placeholder:text-slate-400 focus:border-brand-600 focus:outline-3 focus:outline-brand-200 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label={t.catalog.clearSearch}
          onClick={() => onChange('')}
          className="absolute top-1/2 right-1 flex size-12 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 active:bg-slate-100"
        >
          <X className="size-6" />
        </button>
      )}
    </div>
  )
}
