import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { useI18n } from '@/i18n/i18nContext'
import { IconButton } from './IconButton'

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

/** Bottom sheet built on the native <dialog>, which gives focus trapping, Esc and back-button handling for free. */
export function Sheet({ open, onClose, title, children, footer }: SheetProps) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    // Backdrop click is a pointer-only shortcut; keyboard users already close it with Esc.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      aria-label={title}
      className="sheet"
    >
      {open && (
        <div className="flex max-h-[90dvh] flex-col">
          <header className="flex items-center justify-between gap-2 border-b border-slate-200 py-2 pr-2 pl-5">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <IconButton label={t.common.close} onClick={onClose}>
              <X className="size-6" />
            </IconButton>
          </header>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && (
            <footer className="border-t border-slate-200 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  )
}
