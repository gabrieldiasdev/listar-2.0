import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

interface IconButtonProps extends ComponentProps<'button'> {
  label: string
}

export function IconButton({ label, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-full text-slate-600 active:bg-slate-200',
        'focus-visible:outline-3 focus-visible:outline-brand-600',
        className,
      )}
      {...props}
    />
  )
}
