import { useCallback } from 'react'
import { useToast } from './toastContext'

/**
 * Runs a Firestore write without blocking the UI (it already applied locally) and
 * surfaces a failure, e.g. a rules rejection, once the server answers.
 */
export function useBackgroundWrite() {
  const toast = useToast()
  return useCallback(
    (write: Promise<unknown>) => {
      write.catch((error: unknown) => {
        console.error(error)
        toast({ message: 'Não foi possível salvar. Tente de novo.', tone: 'error' })
      })
    },
    [toast],
  )
}
