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
