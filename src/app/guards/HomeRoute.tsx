import { Navigate } from 'react-router'
import { FullScreenLoader } from '@/components/ui/Spinner'
import { useAuth } from '@/features/auth/authContext'
import { LazyLandingPage } from '../lazyPages'

/** Visitors see the landing page; signed-in users (e.g. the installed app) go straight to their list. */
export function HomeRoute() {
  const { user, loading } = useAuth()

  if (loading) return <FullScreenLoader />
  if (user) return <Navigate to="/casa" replace />
  return <LazyLandingPage />
}
