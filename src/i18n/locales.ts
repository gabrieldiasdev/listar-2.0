export const LOCALES = ['pt-PT', 'pt-BR'] as const
export type Locale = (typeof LOCALES)[number]

/** Portugal is the target market, so anything that is not explicitly Brazilian falls back to it. */
export const DEFAULT_LOCALE: Locale = 'pt-PT'

const STORAGE_KEY = 'listar.locale'

function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale)
}

/** Decides by the first Portuguese language the browser prefers. */
export function resolveLocale(languages: readonly string[]): Locale {
  const portuguese = languages.map((language) => language.toLowerCase()).find((language) => language.startsWith('pt'))
  return portuguese === 'pt-br' ? 'pt-BR' : DEFAULT_LOCALE
}

export function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts only for this visit.
  }
}

export function detectLocale(): Locale {
  return readStoredLocale() ?? resolveLocale(navigator.languages ?? [navigator.language])
}
