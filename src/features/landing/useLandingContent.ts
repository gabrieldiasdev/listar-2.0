import { useI18n } from '@/i18n/i18nContext'
import { landingContent } from './content'

export function useLandingContent() {
  return landingContent[useI18n().locale]
}
