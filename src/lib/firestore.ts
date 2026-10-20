import { FirebaseError } from 'firebase/app'
import { Timestamp, type DocumentData, type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore'

export function isPermissionDenied(error: unknown): boolean {
  return error instanceof FirebaseError && error.code === 'permission-denied'
}

export function toDate(value: unknown): Date | null {
  return value instanceof Timestamp ? value.toDate() : null
}

/** Reads a snapshot resolving pending server timestamps to a local estimate, so offline writes sort correctly. */
export function readSnapshot(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): DocumentData {
  return snapshot.data({ ...options, serverTimestamps: 'estimate' })
}

const CODE_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'

export function randomCode(length = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join('')
}
