import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
  type FirestoreDataConverter,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { readSnapshot, toDate } from '@/lib/firestore'
import { capitalize, clampText } from '@/lib/text'
import type { Subscribe } from '@/lib/useSubscription'
import { ITEM_LIMITS, type Item, type ItemDraft } from './model'

type ItemFields = Omit<Item, 'id' | 'updatedAt'>

const itemConverter: FirestoreDataConverter<Item> = {
  toFirestore: ({ id: _id, updatedAt: _updatedAt, ...data }) => data,
  fromFirestore: (snapshot, options) => {
    const data = readSnapshot(snapshot, options)
    return {
      id: snapshot.id,
      name: data.name,
      section: data.section,
      needed: data.needed ?? false,
      quantity: data.quantity ?? '',
      note: data.note ?? '',
      inCart: data.inCart ?? false,
      flaggedBy: data.flaggedBy ?? null,
      updatedAt: toDate(data.updatedAt),
    }
  },
}

const itemsRef = (householdId: string) => collection(db, 'households', householdId, 'items')
const itemRef = (householdId: string, itemId: string) => doc(itemsRef(householdId), itemId)

function draftText(draft: ItemDraft) {
  return {
    name: capitalize(clampText(draft.name, ITEM_LIMITS.name)),
    section: clampText(draft.section, ITEM_LIMITS.section),
    note: clampText(draft.note, ITEM_LIMITS.note),
    quantity: clampText(draft.quantity, ITEM_LIMITS.quantity),
  }
}

function draftToFields(draft: ItemDraft, userId: string): ItemFields {
  const needed = draft.needed ?? false
  return { ...draftText(draft), needed, inCart: false, flaggedBy: needed ? userId : null }
}

export function subscribeItems(householdId: string): Subscribe<Item[]> {
  return (onData, onError) =>
    onSnapshot(
      itemsRef(householdId).withConverter(itemConverter),
      (snapshot) => onData(snapshot.docs.map((d) => d.data())),
      onError,
    )
}

/*
 * Writes are not awaited by the UI: with the persistent cache they apply locally at once
 * and their promise only settles when the server acknowledges, which never happens offline.
 */

export function addItem(householdId: string, draft: ItemDraft, userId: string) {
  return setDoc(doc(itemsRef(householdId)), { ...draftToFields(draft, userId), updatedAt: serverTimestamp() })
}

export function importItems(householdId: string, drafts: ItemDraft[], userId: string) {
  const batch = writeBatch(db)
  for (const draft of drafts) {
    batch.set(doc(itemsRef(householdId)), { ...draftToFields(draft, userId), updatedAt: serverTimestamp() })
  }
  return batch.commit()
}

export function updateItem(householdId: string, itemId: string, changes: Partial<ItemFields>) {
  return updateDoc(itemRef(householdId, itemId), { ...changes, updatedAt: serverTimestamp() })
}

/** Applies an edit; a quantity only makes sense while the item is needed, and keeps who first asked for it. */
export function updateItemFromDraft(householdId: string, item: Item, draft: ItemDraft, userId: string) {
  const needed = draft.needed ?? item.needed
  const text = draftText(draft)
  return updateItem(householdId, item.id, {
    ...text,
    quantity: needed ? text.quantity : '',
    needed,
    inCart: needed && item.inCart,
    flaggedBy: needed ? (item.needed ? item.flaggedBy : userId) : null,
  })
}

export function deleteItem(householdId: string, itemId: string) {
  return deleteDoc(itemRef(householdId, itemId))
}

export function setNeeded(householdId: string, itemId: string, needed: boolean, userId: string) {
  return updateItem(
    householdId,
    itemId,
    needed ? { needed, flaggedBy: userId } : { needed, flaggedBy: null, inCart: false, quantity: '' },
  )
}

export function setInCart(householdId: string, itemId: string, inCart: boolean) {
  return updateItem(householdId, itemId, { inCart })
}

/** Takes the bought items off the list atomically. Items left out of the cart stay flagged. */
export function finishShopping(householdId: string, cartItems: Item[]) {
  const batch = writeBatch(db)
  for (const item of cartItems) {
    batch.update(itemRef(householdId, item.id), {
      needed: false,
      inCart: false,
      quantity: '',
      flaggedBy: null,
      updatedAt: serverTimestamp(),
    })
  }
  return batch.commit()
}

export function restoreItems(householdId: string, items: Item[]) {
  const batch = writeBatch(db)
  for (const item of items) {
    batch.set(itemRef(householdId, item.id).withConverter(itemConverter), item)
  }
  return batch.commit()
}
