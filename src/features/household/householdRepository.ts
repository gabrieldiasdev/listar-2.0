import {
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type FirestoreDataConverter,
} from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { db } from '@/lib/firebase'
import { randomCode, readSnapshot } from '@/lib/firestore'
import type { Subscribe } from '@/lib/useSubscription'
import type { Household, Member, UserProfile } from './model'

const householdConverter: FirestoreDataConverter<Household> = {
  toFirestore: ({ id: _id, ...data }) => data,
  fromFirestore: (snapshot, options) => {
    const data = readSnapshot(snapshot, options)
    return {
      id: snapshot.id,
      name: data.name,
      ownerId: data.ownerId,
      memberIds: data.memberIds ?? [],
      members: data.members ?? {},
      sections: data.sections ?? [],
      inviteCode: data.inviteCode,
    }
  },
}

const householdsRef = collection(db, 'households').withConverter(householdConverter)
const householdRef = (householdId: string) => doc(householdsRef, householdId)
const userRef = (userId: string) => doc(db, 'users', userId)

function toMember(user: User): Member {
  return { name: user.displayName?.split(' ')[0] ?? '', photoURL: user.photoURL }
}

export function subscribeUserProfile(userId: string): Subscribe<UserProfile> {
  return (onData, onError) =>
    onSnapshot(
      userRef(userId),
      (snapshot) => onData({ activeHouseholdId: snapshot.get('activeHouseholdId') ?? null }),
      onError,
    )
}

export interface HouseholdSnapshot {
  household: Household | null
  /** False while a local write (e.g. its creation) has not reached the server yet. */
  synced: boolean
}

export function subscribeHousehold(householdId: string): Subscribe<HouseholdSnapshot> {
  return (onData, onError) =>
    onSnapshot(
      householdRef(householdId),
      { includeMetadataChanges: true },
      (snapshot) => onData({ household: snapshot.data() ?? null, synced: !snapshot.metadata.hasPendingWrites }),
      onError,
    )
}

export function setActiveHousehold(userId: string, householdId: string | null) {
  return setDoc(userRef(userId), { activeHouseholdId: householdId }, { merge: true })
}

/** Returns the new id synchronously; the batch completes in the background (works offline). */
export function createHousehold(
  user: User,
  name: string,
  sections: string[],
): { id: string; committed: Promise<void> } {
  const ref = doc(collection(db, 'households'))
  const batch = writeBatch(db)
  batch.set(ref, {
    name,
    ownerId: user.uid,
    memberIds: [user.uid],
    members: { [user.uid]: toMember(user) },
    sections,
    inviteCode: randomCode(),
    createdAt: serverTimestamp(),
  })
  batch.set(userRef(user.uid), { activeHouseholdId: ref.id }, { merge: true })
  return { id: ref.id, committed: batch.commit() }
}

async function isMember(userId: string, householdId: string): Promise<boolean> {
  try {
    const snapshot = await getDoc(householdRef(householdId))
    return snapshot.data()?.memberIds.includes(userId) ?? false
  } catch {
    return false
  }
}

export async function joinHousehold(user: User, householdId: string, inviteCode: string) {
  if (await isMember(user.uid, householdId)) {
    await setActiveHousehold(user.uid, householdId)
    return
  }
  await updateDoc(doc(db, 'households', householdId), {
    memberIds: arrayUnion(user.uid),
    [`members.${user.uid}`]: toMember(user),
    joinCode: inviteCode,
  })
  await setActiveHousehold(user.uid, householdId)
}

export function regenerateInviteCode(householdId: string) {
  return updateDoc(householdRef(householdId), { inviteCode: randomCode() })
}

export function renameHousehold(householdId: string, name: string) {
  return updateDoc(householdRef(householdId), { name })
}

export function updateSections(householdId: string, sections: string[]) {
  return updateDoc(householdRef(householdId), { sections })
}

export async function listMemberHouseholds(userId: string): Promise<Household[]> {
  const snapshot = await getDocs(query(householdsRef, where('memberIds', 'array-contains', userId)))
  return snapshot.docs.map((d) => d.data())
}

const DELETE_BATCH_LIMIT = 400

/** Items must go first: their rules check membership through the household document. */
async function deleteHouseholdWithItems(householdId: string) {
  const items = await getDocs(collection(db, 'households', householdId, 'items'))
  for (let start = 0; start < items.docs.length; start += DELETE_BATCH_LIMIT) {
    const batch = writeBatch(db)
    for (const item of items.docs.slice(start, start + DELETE_BATCH_LIMIT)) batch.delete(item.ref)
    await batch.commit()
  }
  await deleteDoc(householdRef(householdId))
}

/** Removes the user from the household, handing ownership on, or deletes it when they are the last member. */
export async function leaveHousehold(household: Household, userId: string) {
  const remaining = household.memberIds.filter((id) => id !== userId)
  if (remaining.length === 0) {
    await deleteHouseholdWithItems(household.id)
    return
  }
  await updateDoc(doc(db, 'households', household.id), {
    memberIds: remaining,
    [`members.${userId}`]: deleteField(),
    ...(household.ownerId === userId && { ownerId: remaining[0] }),
  })
}

export function deleteUserProfile(userId: string) {
  return deleteDoc(userRef(userId))
}

export function buildInviteLink(household: Pick<Household, 'id' | 'inviteCode'>): string {
  return `${window.location.origin}/entrar/${household.id}/${household.inviteCode}`
}
