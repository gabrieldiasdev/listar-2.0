import { describe, expect, it } from 'vitest'
import { parseItemList } from './parseItemList'

describe('parseItemList', () => {
  it('reads one item per line, trimming trailing dots and spaces', () => {
    expect(parseItemList('Arroz             \nMacarrão.      \n\n  Sal.  ')).toEqual([
      { name: 'Arroz', note: '' },
      { name: 'Macarrão', note: '' },
      { name: 'Sal', note: '' },
    ])
  })

  it('splits a note separated by a wide gap', () => {
    expect(parseItemList('Creme de leite       Light\nAdoçante       líquido.    ')).toEqual([
      { name: 'Creme de leite', note: 'Light' },
      { name: 'Adoçante', note: 'líquido' },
    ])
  })

  it('keeps single spaces inside names', () => {
    expect(parseItemList('Papel higiênico     ')).toEqual([{ name: 'Papel higiênico', note: '' }])
  })

  it('removes bullets, capitalizes and drops duplicates ignoring accents', () => {
    expect(parseItemList('- feijão\n* Feijao\n2) óleo')).toEqual([
      { name: 'Feijão', note: '' },
      { name: 'Óleo', note: '' },
    ])
  })
})
