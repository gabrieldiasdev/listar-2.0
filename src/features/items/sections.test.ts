import { describe, expect, it } from 'vitest'
import { defaultSections, groupBySection, suggestSection } from './sections'

const brazilianHousehold = defaultSections('pt-BR')
const portugueseHousehold = defaultSections('pt-PT')

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
  ])('pt-BR: %s → %s', (name, section) => {
    expect(suggestSection(name, brazilianHousehold, 'pt-BR')).toBe(section)
  })

  it.each([
    ['Fiambre', 'Charcutaria e lacticínios'],
    ['Bacalhau', 'Talho e peixaria'],
    ['Sumo de laranja', 'Bebidas'],
    ['Lixívia', 'Limpeza'],
    ['Champô', 'Higiene'],
    ['Película aderente', 'Utilidades'],
    ['Esparguete', 'Mercearia'],
    ['Cereais', 'Pequeno-almoço e doces'],
    ['Frutas', 'Frutas e legumes'],
  ])('pt-PT: %s → %s', (name, section) => {
    expect(suggestSection(name, portugueseHousehold, 'pt-PT')).toBe(section)
  })

  it('prefers the label the household already uses, whatever the current locale', () => {
    expect(suggestSection('Frutas', brazilianHousehold, 'pt-PT')).toBe('Hortifruti')
    expect(suggestSection('Frutas', portugueseHousehold, 'pt-BR')).toBe('Frutas e legumes')
  })

  it('falls back to the current locale label when the household has none of them', () => {
    expect(suggestSection('Frutas', ['Mercearia'], 'pt-PT')).toBe('Frutas e legumes')
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
