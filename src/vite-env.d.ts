/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_USE_EMULATORS?: string
  readonly VITE_RECAPTCHA_ENTERPRISE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Read by the App Check SDK to switch to the debug provider during local development.
declare var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
