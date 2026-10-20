import { createContext, use } from 'react'

export interface ToastOptions {
  message: string
  action?: { label: string; onAction: () => void }
  tone?: 'default' | 'error'
}

export type ShowToast = (options: ToastOptions) => void

export const ToastContext = createContext<ShowToast | null>(null)

export function useToast(): ShowToast {
  const context = use(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
