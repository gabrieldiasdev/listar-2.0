import { Check, Pencil } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useI18n } from '@/i18n/i18nContext'
import { cn } from '@/lib/cn'
import type { Item } from '../model'

interface ItemRowProps {
  item: Item
  requestedBy: string | null
  onToggle: () => void
  onEdit: () => void
}

export function ItemRow({ item, requestedBy, onToggle, onEdit }: ItemRowProps) {
  const { t } = useI18n()
  const details = [item.quantity, item.note].filter(Boolean).join(' · ')

  return (
    <li className={cn('flex items-center rounded-2xl transition-colors', item.needed ? 'bg-brand-50 ring-1 ring-brand-200' : 'bg-white')}>
      <button
        type="button"
        role="checkbox"
        aria-checked={item.needed}
        onClick={onToggle}
        className="flex min-h-16 flex-1 items-center gap-4 py-2 pl-4 text-left"
      >
        <span
          aria-hidden
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-lg border-2 transition-colors',
            item.needed ? 'border-brand-700 bg-brand-700 text-white' : 'border-slate-300 bg-white',
          )}
        >
          {item.needed && <Check className="size-6" strokeWidth={3} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('block text-lg leading-tight', item.needed ? 'font-bold text-brand-900' : 'text-slate-800')}>
            {item.name}
          </span>
          {(details || (item.needed && requestedBy)) && (
            <span className="block text-sm text-slate-600">
              {details}
              {item.needed && requestedBy && (
                <span className="text-slate-500">
                  {details && ' · '}
                  {t.catalog.requestedBy(requestedBy)}
                </span>
              )}
            </span>
          )}
        </span>
      </button>
      <IconButton label={t.catalog.editItem(item.name)} onClick={onEdit} className="mr-1">
        <Pencil className="size-5" />
      </IconButton>
    </li>
  )
}
