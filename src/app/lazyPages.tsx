import { lazy, Suspense, type ComponentProps } from 'react'
import { FullScreenLoader } from '@/components/ui/Spinner'

/* Pages outside the signed-in app are split into their own chunks. */

const LandingPage = lazy(() => import('@/features/landing/LandingPage').then((m) => ({ default: m.LandingPage })))
const LegalPage = lazy(() => import('@/features/legal/LegalPage').then((m) => ({ default: m.LegalPage })))
const DeleteAccountPage = lazy(() =>
  import('@/features/account/DeleteAccountPage').then((m) => ({ default: m.DeleteAccountPage })),
)

export function LazyLandingPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <LandingPage />
    </Suspense>
  )
}

export function LazyLegalPage(props: ComponentProps<typeof LegalPage>) {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <LegalPage {...props} />
    </Suspense>
  )
}

export function LazyDeleteAccountPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <DeleteAccountPage />
    </Suspense>
  )
}
