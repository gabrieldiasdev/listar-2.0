import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-brand-700 text-white active:bg-brand-800 disabled:bg-slate-300',
  secondary: 'bg-white text-slate-800 ring-1 ring-slate-300 active:bg-slate-100',
  ghost: 'text-brand-800 active:bg-brand-50',
  danger: 'bg-white text-red-700 ring-1 ring-red-300 active:bg-red-50',
  destructive: 'bg-red-700 text-white active:bg-red-800 disabled:bg-red-300',
}

const sizes = {
  md: 'min-h-12 px-4 text-base',
  lg: 'min-h-14 px-6 text-lg',
}

export interface ButtonStyle {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  block?: boolean
}

/** Shared with links that should look like buttons. */
export function buttonClassName({ variant = 'primary', size = 'md', block }: ButtonStyle = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors select-none',
    'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    block && 'w-full',
  )
}
