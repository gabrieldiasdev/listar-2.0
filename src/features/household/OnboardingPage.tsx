import { Link2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { TextField } from '@/components/ui/TextField'
import { useCurrentUser } from '@/features/auth/authContext'
import { signOut } from '@/features/auth/authService'
import { createHousehold } from './householdRepository'
import { useUserProfile } from './useUserProfile'

export function OnboardingPage() {
  const user = useCurrentUser()
  const profile = useUserProfile()
  const write = useBackgroundWrite()
  const [name, setName] = useState('Nossa casa')

  if (profile.loading) return <FullScreenLoader />
  if (profile.data?.activeHouseholdId) return <Navigate to="/casa" replace />

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    write(createHousehold(user, name.trim()).committed)
  }

  const firstName = user.displayName?.split(' ')[0]

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Olá{firstName ? `, ${firstName}` : ''}!</h1>
        <p className="mt-2 text-lg text-slate-600">Vamos criar a lista de compras da sua casa.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <TextField
          label="Nome da lista"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
          required
        />
        <Button type="submit" size="lg" block disabled={!name.trim()}>
          Criar lista
        </Button>
      </form>

      <div className="flex gap-3 rounded-3xl bg-brand-50 p-5 text-brand-900">
        <Link2 className="mt-0.5 size-6 shrink-0" aria-hidden />
        <p>
          <strong>Recebeu um convite?</strong> Abra o link que mandaram para você e você entra direto na lista da
          família.
        </p>
      </div>

      <Button variant="ghost" onClick={() => void signOut()}>
        Sair da conta
      </Button>
    </div>
  )
}
