import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import {
  clearIndexedDbPersistence,
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  terminate,
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true'
const recaptchaKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_KEY

// App Check must start before Auth and Firestore so their very first requests carry a token.
// Emulators don't enforce it; in local development against the real project a debug token is used
// (printed in the console once, then registered under App Check → Manage debug tokens).
if (!useEmulators && recaptchaKey) {
  if (import.meta.env.DEV) self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(recaptchaKey),
    isTokenAutoRefreshEnabled: true,
  })
}

export const auth = getAuth(app)
auth.languageCode = 'pt'

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})

if (useEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

/** Wipes the offline copy of the data from this device. Firestore is unusable afterwards; reload the page. */
export async function clearLocalCache() {
  await terminate(db)
  await clearIndexedDbPersistence(db)
}
