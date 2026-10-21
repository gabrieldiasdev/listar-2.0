import { CircleCheck, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { site } from '@/config/site'
import { useAuth } from '@/features/auth/authContext'
import { isUserCancellation } from '@/features/auth/authService'
import { useI18n } from '@/i18n/i18nContext'
import { deleteAccount } from './deleteAccount'

type Status = 'idle' | 'deleting' | 'done' | 'offline' | 'failed'

export function DeleteAccountPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  if (status === 'done') return <AccountDeleted />
  if (loading) return <FullScreenLoader />
  if (!user) return <Navigate to="/login" replace state={{ from: site.deleteAccountPath }} />

  async function handleDelete() {
    if (!user) return
    if (!navigator.onLine) {
      setStatus('offline')
      return
    }
    setStatus('deleting')
    try {
      await deleteAccount(user)
      setStatus('done')
    } catch (error) {
      if (isUserCancellation(error)) {
        setStatus('idle')
        return
      }
      console.error(error)
      setStatus('failed')
    }
  }

  const copy = t.deleteAccount
  const deleting = status === 'deleting'

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 py-10">
      <span className="flex size-16 items-center justify-center rounded-full bg-red-100 text-red-700">
        <TriangleAlert className="size-8" aria-hidden />
      </span>
      <h1 className="text-3xl font-bold text-slate-900">{copy.title}</h1>

      <div className="space-y-3 text-lg text-slate-700">
        <p>{copy.intro}</p>
        <ul className="list-disc space-y-1 pl-6">
          {copy.consequences.map((consequence) => (
            <li key={consequence}>{consequence}</li>
          ))}
        </ul>
        <p>{copy.others}</p>
        <p className="font-semibold text-red-800">{copy.irreversible}</p>
        <p className="text-slate-600">{copy.reauthHint}</p>
      </div>

      {(status === 'offline' || status === 'failed') && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">
          {status === 'offline' ? copy.offline : copy.failed}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <Button variant="destructive" size="lg" block disabled={deleting} onClick={handleDelete}>
          {deleting ? copy.deleting : copy.confirm}
        </Button>
        <Button variant="secondary" size="lg" block disabled={deleting} onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/ajustes'))}>
          {copy.cancel}
        </Button>
      </div>
    </div>
  )
}

function AccountDeleted() {
  const { t } = useI18n()

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-5 px-6 text-center">
      <CircleCheck className="size-16 text-brand-700" aria-hidden />
      <h1 className="text-3xl font-bold text-slate-900">{t.deleteAccount.doneTitle}</h1>
      <p className="text-lg text-slate-600">{t.deleteAccount.doneDescription}</p>
      {/* Full reload: the Firestore instance was terminated while clearing the offline cache. */}
      <Button size="lg" block onClick={() => window.location.assign('/')}>
        {t.deleteAccount.goHome}
      </Button>
    </div>
  )
}
