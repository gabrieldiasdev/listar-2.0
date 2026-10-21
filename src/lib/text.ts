export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase('pt-BR') + value.slice(1)
}

/** Trims and cuts to the stored limit, so pasted text can never be rejected by the security rules. */
export function clampText(value: string | undefined, maxLength: number): string {
  return (value ?? '').trim().slice(0, maxLength)
}

export function compareText(a: string, b: string): number {
  return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
}
