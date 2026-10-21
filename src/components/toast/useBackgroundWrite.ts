import { useCallback } from 'react'
import { useI18n } from '@/i18n/i18nContext'
import { useToast } from './toastContext'

/**
 * Runs a Firestore write without blocking the UI (it already applied locally) and
 * surfaces a failure, e.g. a rules rejection, once the server answers.
 */
export function useBackgroundWrite() {
  const toast = useToast()
  const { t } = useI18n()
  return useCallback(
    (write: Promise<unknown>) => {
      write.catch((error: unknown) => {
        console.error(error)
        toast({ message: t.common.saveFailed, tone: 'error' })
      })
    },
    [toast, t],
  )
}
