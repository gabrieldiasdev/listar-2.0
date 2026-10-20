import { describe, expect, it } from 'vitest'
import { groupBySection, suggestSection } from './sections'

describe('suggestSection', () => {
  it.each([
    ['Arroz', 'Mercearia'],
    ['Leite', 'Frios e laticínios'],
    ['Leite condensado', 'Matinais e doces'],
    ['Creme de leite', 'Mercearia'],
    ['Molho de tomate', 'Molhos e temperos'],
    ['Papel higiênico', 'Higiene'],
    ['Papel alumínio', 'Utilidades'],
    ['Sabonete líquido', 'Higiene'],
    ['Bolachas', 'Matinais e doces'],
    ['Frutas', 'Hortifruti'],
    ['Pão de forma', 'Padaria'],
    ['Anti mofo', 'Limpeza'],
    ['Filtro de água', 'Utilidades'],
    ['Salgadinho', 'Outros'],
  ])('%s → %s', (name, section) => {
    expect(suggestSection(name)).toBe(section)
  })
})

describe('groupBySection', () => {
  it('orders groups by the household order, unknown sections last, items alphabetically', () => {
    const items = [
      { name: 'Sal', section: 'Temperos' },
      { name: 'Feijão', section: 'Mercearia' },
      { name: 'Arroz', section: 'Mercearia' },
      { name: 'Detergente', section: 'Limpeza' },
    ]
    const groups = groupBySection(items, ['Limpeza', 'Mercearia'])

    expect(groups.map((group) => group.section)).toEqual(['Limpeza', 'Mercearia', 'Temperos'])
    expect(groups[1]?.items.map((item) => item.name)).toEqual(['Arroz', 'Feijão'])
  })
})
