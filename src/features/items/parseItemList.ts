import { capitalize, normalizeText } from '@/lib/text'

export interface ParsedItem {
  name: string
  note: string
}

const BULLET = /^\s*(?:[-*•]|\d+[.)])\s+/
const TRAILING_PUNCTUATION = /[.,;:]+$/

function clean(part: string): string {
  return part.trim().replace(TRAILING_PUNCTUATION, '').trim()
}

/**
 * Parses a free-form list, one item per line. A run of 2+ spaces or a tab separates
 * the name from a note, matching how lists are aligned in notes apps ("Creme de leite     Light").
 */
export function parseItemList(text: string): ParsedItem[] {
  const seen = new Set<string>()
  const result: ParsedItem[] = []

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(BULLET, '')
    const [rawName = '', ...rest] = line.trim().split(/\s{2,}|\t+/)
    const name = clean(rawName).replace(/\s+/g, ' ')
    if (!name) continue

    const key = normalizeText(name)
    if (seen.has(key)) continue
    seen.add(key)

    result.push({ name: capitalize(name), note: rest.map(clean).filter(Boolean).join(' ') })
  }
  return result
}
