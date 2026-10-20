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

export function compareText(a: string, b: string): number {
  return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
}
