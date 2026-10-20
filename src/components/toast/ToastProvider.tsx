import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ToastContext, type ShowToast, type ToastOptions } from './toastContext'

interface ActiveToast extends ToastOptions {
  id: number
}

const DURATION_MS = 4000
// Toasts with an action (e.g. undo) stay longer so there is time to react.
const ACTION_DURATION_MS = 8000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null)

  const show = useCallback<ShowToast>((options) => setToast({ ...options, id: Date.now() }), [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), toast.action ? ACTION_DURATION_MS : DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [toast])

  return (
    <ToastContext value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
        {toast && (
          <div
            key={toast.id}
            role={toast.tone === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-lg ${
              toast.tone === 'error' ? 'bg-red-700' : 'bg-slate-800'
            }`}
          >
            <span className="flex-1">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                className="min-h-12 rounded-lg px-3 font-bold text-brand-200 uppercase active:bg-white/10"
                onClick={() => {
                  toast.action?.onAction()
                  setToast(null)
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </ToastContext>
  )
}
