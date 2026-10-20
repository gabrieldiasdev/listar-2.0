import { describe, expect, it } from 'vitest'
import { resolveLocale } from './locales'

describe('resolveLocale', () => {
  it.each([
    [['pt-BR', 'en'], 'pt-BR'],
    [['pt-PT'], 'pt-PT'],
    [['pt'], 'pt-PT'],
    [['en-GB', 'pt-BR'], 'pt-BR'],
    [['en-US', 'fr'], 'pt-PT'],
    [[], 'pt-PT'],
  ])('%j → %s', (languages, expected) => {
    expect(resolveLocale(languages)).toBe(expected)
  })
})
