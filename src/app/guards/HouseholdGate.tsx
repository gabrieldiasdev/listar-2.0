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
import { useI18n } from '@/i18n/i18nContext'

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
  const { t } = useI18n()

  if (status === 'loading') return <FullScreenLoader />

  if (status === 'error') {
    // A reload also picks up a newer app version, which fixes errors caused by an outdated client.
    return (
      <EmptyState
        icon={CloudOff}
        title={t.access.errorTitle}
        description={t.access.errorDescription}
        action={
          <Button size="lg" onClick={() => window.location.reload()}>
            {t.access.retry}
          </Button>
        }
      />
    )
  }

  return (
    <EmptyState
      icon={Lock}
      title={t.access.deniedTitle}
      description={t.access.deniedDescription}
      action={
        <Button onClick={() => write(setActiveHousehold(user.uid, null))}>
          {t.common.continue}
        </Button>
      }
    />
  )
}
