import { deleteUser, type User } from 'firebase/auth'
import { reauthenticateWithGoogle } from '@/features/auth/authService'
import {
  deleteUserProfile,
  leaveHousehold,
  listMemberHouseholds,
} from '@/features/household/householdRepository'
import { clearLocalCache } from '@/lib/firebase'

/**
 * Erases everything tied to the user: leaves every household (deleting those where they are the
 * last member), removes their profile and Auth account, then wipes the offline cache on this device.
 * Re-authentication comes first so the Auth deletion cannot fail halfway through.
 */
export async function deleteAccount(user: User) {
  await reauthenticateWithGoogle(user)

  for (const household of await listMemberHouseholds(user.uid)) {
    await leaveHousehold(household, user.uid)
  }
  await deleteUserProfile(user.uid)
  await deleteUser(user)
  await clearLocalCache()
}
