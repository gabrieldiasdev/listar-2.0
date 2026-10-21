/** Limits, also enforced by firestore.rules. */
export const HOUSEHOLD_LIMITS = { name: 60, sectionName: 40, sections: 40, members: 20 } as const

export interface Member {
  name: string
  photoURL: string | null
}

export interface Household {
  id: string
  name: string
  ownerId: string
  memberIds: string[]
  members: Record<string, Member>
  sections: string[]
  inviteCode: string
}

export interface UserProfile {
  activeHouseholdId: string | null
}
