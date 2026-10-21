import { describe, expect, it } from 'vitest'
import { clampText } from './text'

describe('clampText', () => {
  it('trims and cuts to the limit', () => {
    expect(clampText('  Arroz  ', 80)).toBe('Arroz')
    expect(clampText('a'.repeat(100), 60)).toHaveLength(60)
  })

  it('treats missing values as empty', () => {
    expect(clampText(undefined, 10)).toBe('')
  })
})
