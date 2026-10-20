import { readFileSync } from 'node:fs'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { arrayUnion, doc, getDoc, setDoc, updateDoc, type Firestore } from 'firebase/firestore'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'

const HOUSEHOLD = 'house-1'
const INVITE = 'secret-code'

let env: RulesTestEnvironment

const asUser = (uid: string): Firestore => env.authenticatedContext(uid).firestore() as unknown as Firestore
const household = (db: Firestore) => doc(db, 'households', HOUSEHOLD)

function householdData(ownerId: string) {
  return {
    name: 'Casa',
    ownerId,
    memberIds: [ownerId],
    members: { [ownerId]: { name: 'Pai', photoURL: null } },
    sections: ['Mercearia'],
    inviteCode: INVITE,
  }
}

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-listar',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  })
})

afterAll(() => env.cleanup())

beforeEach(async () => {
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore() as unknown as Firestore
    await setDoc(household(db), householdData('dad'))
    await setDoc(doc(db, 'households', HOUSEHOLD, 'items', 'rice'), { name: 'Arroz', needed: false, section: 'Mercearia' })
  })
})

describe('users', () => {
  it('lets a user manage only their own profile', async () => {
    await assertSucceeds(setDoc(doc(asUser('dad'), 'users', 'dad'), { activeHouseholdId: HOUSEHOLD }))
    await assertFails(getDoc(doc(asUser('stranger'), 'users', 'dad')))
  })
})

describe('households', () => {
  it('allows creating a household owned by the creator only', async () => {
    const db = asUser('mom')
    await assertSucceeds(setDoc(doc(db, 'households', 'new'), householdData('mom')))
    await assertFails(setDoc(doc(db, 'households', 'other'), householdData('dad')))
  })

  it('hides a household from non-members', async () => {
    await assertSucceeds(getDoc(household(asUser('dad'))))
    await assertFails(getDoc(household(asUser('stranger'))))
  })

  it('allows reading a household that does not exist yet', async () => {
    await assertSucceeds(getDoc(doc(asUser('stranger'), 'households', 'not-created')))
  })

  it('blocks subcollections of a household that does not exist', async () => {
    await assertFails(getDoc(doc(asUser('stranger'), 'households', 'not-created', 'items', 'x')))
  })

  it('lets someone join with the current invite code', async () => {
    await assertSucceeds(
      updateDoc(household(asUser('mom')), {
        memberIds: arrayUnion('mom'),
        'members.mom': { name: 'Mãe', photoURL: null },
        joinCode: INVITE,
      }),
    )
  })

  it('rejects joining with a wrong code', async () => {
    await assertFails(
      updateDoc(household(asUser('mom')), {
        memberIds: arrayUnion('mom'),
        'members.mom': { name: 'Mãe', photoURL: null },
        joinCode: 'guess',
      }),
    )
  })

  it('rejects a joiner who adds someone else or touches other fields', async () => {
    await assertFails(
      updateDoc(household(asUser('mom')), {
        memberIds: arrayUnion('mom', 'friend'),
        'members.mom': { name: 'Mãe', photoURL: null },
        joinCode: INVITE,
      }),
    )
    await assertFails(
      updateDoc(household(asUser('mom')), {
        memberIds: arrayUnion('mom'),
        'members.mom': { name: 'Mãe', photoURL: null },
        joinCode: INVITE,
        name: 'Hacked',
      }),
    )
  })

  it('lets members edit the list but not take ownership or manage members', async () => {
    await env.withSecurityRulesDisabled((context) =>
      updateDoc(household(context.firestore() as unknown as Firestore), { memberIds: ['dad', 'son'] }),
    )
    const son = asUser('son')
    await assertSucceeds(updateDoc(household(son), { sections: ['Limpeza', 'Mercearia'] }))
    await assertFails(updateDoc(household(son), { ownerId: 'son' }))
    await assertFails(updateDoc(household(son), { memberIds: ['son'] }))
  })
})

describe('household subcollections', () => {
  it('lets members read and write items', async () => {
    const item = doc(asUser('dad'), 'households', HOUSEHOLD, 'items', 'rice')
    await assertSucceeds(getDoc(item))
    await assertSucceeds(updateDoc(item, { needed: true }))
  })

  it('blocks non-members from items', async () => {
    const item = doc(asUser('stranger'), 'households', HOUSEHOLD, 'items', 'rice')
    await assertFails(getDoc(item))
    await assertFails(updateDoc(item, { needed: true }))
  })

  it('validates item shape', async () => {
    const item = doc(asUser('dad'), 'households', HOUSEHOLD, 'items', 'bad')
    await assertFails(setDoc(item, { name: '', needed: false }))
    await assertFails(setDoc(item, { name: 'Sal', needed: 'yes' }))
  })
})
