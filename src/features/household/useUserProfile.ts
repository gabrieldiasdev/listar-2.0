import { useCurrentUser } from '@/features/auth/authContext'
import { useSubscription } from '@/lib/useSubscription'
import { subscribeUserProfile } from './householdRepository'

export function useUserProfile() {
  const user = useCurrentUser()
  return useSubscription(`user:${user.uid}`, subscribeUserProfile(user.uid))
}
