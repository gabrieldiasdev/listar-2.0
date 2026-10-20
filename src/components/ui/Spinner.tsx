import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export function Spinner({ className }: { className?: string }) {
  return <LoaderCircle aria-hidden className={cn('size-8 animate-spin text-brand-700', className)} />
}

export function FullScreenLoader({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div role="status" className="flex min-h-dvh flex-col items-center justify-center gap-3 text-slate-600">
      <Spinner className="size-10" />
      <span>{label}</span>
    </div>
  )
}
