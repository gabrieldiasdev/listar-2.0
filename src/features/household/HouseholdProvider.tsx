import { useMemo, useState, type ReactNode } from 'react'
import { useCurrentUser } from '@/features/auth/authContext'
import { subscribeItems } from '@/features/items/itemsRepository'
import { isPermissionDenied } from '@/lib/firestore'
import { useSubscription } from '@/lib/useSubscription'
import {
  HouseholdContext,
  type HouseholdContextValue,
} from './householdContext'
import { subscribeHousehold } from './householdRepository'

/**
 * `unavailable`: the user is not a member (or the household is gone).
 * `error`: anything else, e.g. a transient failure or an outdated client; membership is untouched.
 */
export type FallbackStatus = 'loading' | 'unavailable' | 'error'

interface HouseholdProviderProps {
  householdId: string
  children: ReactNode
  fallback: (status: FallbackStatus) => ReactNode
}

/** Keeps the household and its items live for every tab, so switching tabs is instant. */
export function HouseholdProvider({
  householdId,
  children,
  fallback,
}: HouseholdProviderProps) {
  const user = useCurrentUser()
  const snapshot = useSubscription(
    `household:${householdId}`,
    subscribeHousehold(householdId),
  )
  const household = snapshot.data?.household

  // Subcollection rules read the household document, so listening before a just-created
  // household reaches the server would be rejected (and Firestore listener errors are final).
  // Latched so later pending edits to the household don't tear the listeners down.
  const [confirmed, setConfirmed] = useState(false)
  if (!confirmed && household && snapshot.data?.synced) setConfirmed(true)

  const listenKey = confirmed ? householdId : null
  const items = useSubscription(
    listenKey && `items:${listenKey}`,
    subscribeItems(householdId),
  )

  const value = useMemo<HouseholdContextValue | null>(() => {
    if (!household || !items.data) return null
    const { members } = household
    return {
      household,
      items: items.data,
      me: {
        id: user.uid,
        name: members[user.uid]?.name ?? user.displayName ?? 'Eu',
      },
      memberName: (userId) => (userId ? (members[userId]?.name ?? null) : null),
    }
  }, [household, items.data, user.uid, user.displayName])

  const householdMissing = !snapshot.loading && household === null
  if (isPermissionDenied(snapshot.error) || householdMissing) {
    return fallback('unavailable')
  }
  if (snapshot.error || items.error) return fallback('error')
  if (!value) return fallback('loading')

  return <HouseholdContext value={value}>{children}</HouseholdContext>
}
