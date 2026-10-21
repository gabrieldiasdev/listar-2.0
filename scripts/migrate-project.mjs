// One-off copy of Auth users and all Firestore data from the old project to the new one.
// Usage: node scripts/migrate-project.mjs [--apply] [--skip=<id>,<id>…]   (dry run without --apply)
// --skip drops collections or documents whose id matches, together with everything below them.
// Expects service account keys in .secrets/old.json and .secrets/new.json.
import { readFileSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const apply = process.argv.includes('--apply')
const skipped = new Set(
  process.argv
    .find((arg) => arg.startsWith('--skip='))
    ?.slice('--skip='.length)
    .split(',')
    .filter(Boolean) ?? [],
)
const BATCH_LIMIT = 400

function connect(name) {
  const credentials = JSON.parse(readFileSync(`.secrets/${name}.json`, 'utf8'))
  const app = initializeApp({ credential: cert(credentials) }, name)
  return { projectId: credentials.project_id, auth: getAuth(app), db: getFirestore(app) }
}

async function listAllUsers(auth) {
  const users = []
  let pageToken
  do {
    const page = await auth.listUsers(1000, pageToken)
    users.push(...page.users)
    pageToken = page.pageToken
  } while (pageToken)
  return users
}

function toImportRecord(user) {
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: user.disabled,
    metadata: { creationTime: user.metadata.creationTime, lastSignInTime: user.metadata.lastSignInTime },
    providerData: user.providerData.map(({ uid, providerId, email, displayName, photoURL }) => ({
      uid,
      providerId,
      email,
      displayName,
      photoURL,
    })),
  }
}

/** Collects every document of the given collections and, recursively, their subcollections. */
async function collectDocuments(collections, out = []) {
  for (const collection of collections) {
    if (skipped.has(collection.id)) continue
    const snapshot = await collection.get()
    for (const doc of snapshot.docs) {
      if (skipped.has(doc.id)) continue
      out.push({ path: doc.ref.path, data: doc.data() })
      await collectDocuments(await doc.ref.listCollections(), out)
    }
  }
  return out
}

async function writeDocuments(db, documents) {
  for (let start = 0; start < documents.length; start += BATCH_LIMIT) {
    const batch = db.batch()
    for (const { path, data } of documents.slice(start, start + BATCH_LIMIT)) batch.set(db.doc(path), data)
    await batch.commit()
  }
}

const source = connect('old')
const target = connect('new')
console.log(`From ${source.projectId} → ${target.projectId}${apply ? '' : ' (dry run)'}\n`)

const [sourceUsers, targetUsers] = await Promise.all([listAllUsers(source.auth), listAllUsers(target.auth)])
const [sourceDocs, targetCollections] = await Promise.all([
  collectDocuments(await source.db.listCollections()),
  target.db.listCollections(),
])

console.log(`Users: ${sourceUsers.length}`)
for (const user of sourceUsers) console.log(`  ${user.uid}  ${user.email ?? '(no email)'}`)

const byCollection = Object.groupBy(sourceDocs, ({ path }) => path.split('/').filter((_, i) => i % 2 === 0).join('/'))
console.log(`\nDocuments: ${sourceDocs.length}`)
for (const [collection, docs] of Object.entries(byCollection)) console.log(`  ${collection}: ${docs.length}`)

if (targetUsers.length > 0 || targetCollections.length > 0) {
  console.error(`\nAborting: ${target.projectId} already has data (${targetUsers.length} users, ${targetCollections.length} collections).`)
  process.exit(1)
}

if (!apply) {
  console.log('\nDry run only. Re-run with --apply to copy.')
  process.exit(0)
}

const result = await target.auth.importUsers(sourceUsers.map(toImportRecord))
if (result.failureCount > 0) {
  for (const { index, error } of result.errors) console.error(`  user ${sourceUsers[index].uid}: ${error.message}`)
  process.exit(1)
}
console.log(`\nImported ${result.successCount} users.`)

await writeDocuments(target.db, sourceDocs)
console.log(`Copied ${sourceDocs.length} documents.`)

const copied = await collectDocuments(await target.db.listCollections())
console.log(copied.length === sourceDocs.length ? 'Verified: document counts match.' : `Mismatch: ${copied.length} in target.`)
