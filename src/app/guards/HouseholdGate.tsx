import { CloudOff, Lock } from 'lucide-react'
import { Navigate, Outlet } from 'react-router'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { useCurrentUser } from '@/features/auth/authContext'
import { setActiveHousehold } from '@/features/household/householdRepository'
import {
  HouseholdProvider,
  type FallbackStatus,
} from '@/features/household/HouseholdProvider'
import { useUserProfile } from '@/features/household/useUserProfile'

export function HouseholdGate() {
  const profile = useUserProfile()

  if (profile.loading) return <FullScreenLoader />
  const householdId = profile.data?.activeHouseholdId
  if (!householdId) return <Navigate to="/bem-vindo" replace />

  return (
    <HouseholdProvider
      key={householdId}
      householdId={householdId}
      fallback={(status) => <HouseholdFallback status={status} />}
    >
      <Outlet />
    </HouseholdProvider>
  )
}

function HouseholdFallback({ status }: { status: FallbackStatus }) {
  const user = useCurrentUser()
  const write = useBackgroundWrite()

  if (status === 'loading') return <FullScreenLoader />

  if (status === 'error') {
    // A reload also picks up a newer app version, which fixes errors caused by an outdated client.
    return (
      <EmptyState
        icon={CloudOff}
        title="Algo deu errado"
        description="Não foi possível carregar a lista agora. Verifique a internet e tente de novo."
        action={
          <Button size="lg" onClick={() => window.location.reload()}>
            Tentar de novo
          </Button>
        }
      />
    )
  }

  return (
    <EmptyState
      icon={Lock}
      title="Você não tem acesso a essa lista"
      description="Talvez você tenha sido removido dela. Crie uma nova ou peça um convite."
      action={
        <Button onClick={() => write(setActiveHousehold(user.uid, null))}>
          Continuar
        </Button>
      }
    />
  )
}
