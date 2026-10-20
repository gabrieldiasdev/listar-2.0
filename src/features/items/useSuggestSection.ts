import { useCallback } from 'react'
import { useHousehold } from '@/features/household/householdContext'
import { useI18n } from '@/i18n/i18nContext'
import { suggestSection } from './sections'

export function useSuggestSection() {
  const { household } = useHousehold()
  const { locale } = useI18n()
  return useCallback((name: string) => suggestSection(name, household.sections, locale), [household.sections, locale])
}
