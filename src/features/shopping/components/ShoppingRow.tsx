import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Item } from '@/features/items/model'

interface ShoppingRowProps {
  item: Item
  onToggle: () => void
}

export function ShoppingRow({ item, onToggle }: ShoppingRowProps) {
  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={item.inCart}
        onClick={onToggle}
        className={cn(
          'flex min-h-18 w-full items-center gap-4 rounded-2xl px-4 py-2 text-left transition-colors',
          item.inCart ? 'bg-slate-100' : 'bg-white shadow-sm ring-1 ring-slate-200',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border-2',
            item.inCart ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-400',
          )}
        >
          {item.inCart && <Check className="size-6" strokeWidth={3} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('block text-xl leading-tight font-semibold', item.inCart && 'text-slate-400 line-through')}>
            {item.name}
          </span>
          {item.note && <span className="block text-slate-500">{item.note}</span>}
        </span>
        {item.quantity && (
          <span className={cn('shrink-0 rounded-lg px-2 py-1 font-bold', item.inCart ? 'text-slate-400' : 'bg-amber-100 text-amber-900')}>
            {item.quantity}
          </span>
        )}
      </button>
    </li>
  )
}
