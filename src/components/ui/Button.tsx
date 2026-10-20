import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { buttonClassName, type ButtonStyle } from './buttonStyles'

export interface ButtonProps extends ComponentProps<'button'>, ButtonStyle {}

export function Button({ variant, size, block, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClassName({ variant, size, block }), className)} {...props} />
}
