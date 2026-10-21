import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nValue } from './i18nContext'
import { detectLocale, storeLocale, type Locale } from './locales'
import { ptBR, type Messages } from './messages/ptBR'
import { ptPT } from './messages/ptPT'

const messages: Record<Locale, Messages> = { 'pt-BR': ptBR, 'pt-PT': ptPT }

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(detectLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    storeLocale(next)
    setLocaleState(next)
  }, [])

  const value = useMemo<I18nValue>(() => ({ locale, setLocale, t: messages[locale] }), [locale, setLocale])

  return <I18nContext value={value}>{children}</I18nContext>
}
