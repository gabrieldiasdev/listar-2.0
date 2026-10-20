import { FirebaseError } from 'firebase/app'
import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { buttonClassName } from '@/components/ui/buttonStyles'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { useCurrentUser } from '@/features/auth/authContext'
import { joinHousehold } from './householdRepository'

type JoinState = { status: 'joining' } | { status: 'joined' } | { status: 'failed'; message: string }

export function JoinPage() {
  const user = useCurrentUser()
  const { householdId = '', code = '' } = useParams()
  const [state, setState] = useState<JoinState>({ status: 'joining' })
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    joinHousehold(user, householdId, code)
      .then(() => setState({ status: 'joined' }))
      .catch((error: unknown) => {
        console.error(error)
        const denied = error instanceof FirebaseError && ['permission-denied', 'not-found'].includes(error.code)
        setState({
          status: 'failed',
          message: denied
            ? 'Este convite não é mais válido. Peça um link novo para quem te convidou.'
            : 'Não foi possível entrar agora. Verifique a internet e tente de novo.',
        })
      })
  }, [user, householdId, code])

  if (state.status === 'joining') return <FullScreenLoader label="Entrando na lista…" />
  if (state.status === 'joined') return <Navigate to="/casa" replace />

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Não deu certo</h1>
      <p className="text-lg text-slate-600">{state.message}</p>
      <Link to="/" className={buttonClassName({ size: 'lg', block: true })}>
        Voltar ao início
      </Link>
    </div>
  )
}
