import { createContext, use } from 'react'
import type { Locale } from './locales'
import type { Messages } from './messages/ptBR'

export interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const context = use(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
