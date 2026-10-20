import { Lock } from 'lucide-react'
import { Navigate, Outlet } from 'react-router'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { useCurrentUser } from '@/features/auth/authContext'
import { setActiveHousehold } from '@/features/household/householdRepository'
import { HouseholdProvider } from '@/features/household/HouseholdProvider'
import { useUserProfile } from '@/features/household/useUserProfile'

export function HouseholdGate() {
  const user = useCurrentUser()
  const profile = useUserProfile()
  const write = useBackgroundWrite()

  if (profile.loading) return <FullScreenLoader />
  const householdId = profile.data?.activeHouseholdId
  if (!householdId) return <Navigate to="/bem-vindo" replace />

  return (
    <HouseholdProvider
      key={householdId}
      householdId={householdId}
      fallback={(status) =>
        status === 'loading' ? (
          <FullScreenLoader />
        ) : (
          <EmptyState
            icon={Lock}
            title="Você não tem acesso a essa lista"
            description="Talvez você tenha sido removido dela. Crie uma nova ou peça um convite."
            action={<Button onClick={() => write(setActiveHousehold(user.uid, null))}>Continuar</Button>}
          />
        )
      }
    >
      <Outlet />
    </HouseholdProvider>
  )
}
