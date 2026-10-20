import { compareText, normalizeText } from '@/lib/text'
import type { Item } from './model'

export const FALLBACK_SECTION = 'Outros'

const SECTION_KEYWORDS: Record<string, string[]> = {
  Hortifruti: ['fruta', 'legume', 'verdura', 'ovo', 'banana', 'maca', 'laranja', 'limao', 'tomate', 'cebola', 'alho', 'batata', 'cenoura', 'alface'],
  'Carnes e peixes': ['carne', 'frango', 'peixe', 'linguica', 'bife', 'file', 'costela', 'salsicha', 'presunto'],
  'Frios e laticínios': ['leite', 'queijo', 'manteiga', 'margarina', 'iogurte', 'requeijao', 'mussarela', 'nata'],
  Padaria: ['pao', 'pao de forma', 'bisnaguinha', 'torrada', 'mini tosta'],
  'Matinais e doces': ['cafe', 'cha', 'acucar', 'adocante', 'aveia', 'mel', 'bolacha', 'biscoito', 'pipoca', 'leite condensado', 'baunilha', 'chocolate', 'achocolatado', 'granola'],
  Mercearia: ['arroz', 'feijao', 'macarrao', 'lasanha', 'farinha', 'farinha de rosca', 'atum', 'sardinha', 'ervilha', 'milho', 'azeitona', 'creme de leite', 'fuba'],
  'Molhos e temperos': ['molho', 'molho de tomate', 'maionese', 'catchup', 'ketchup', 'mostarda', 'tempero', 'sal', 'vinagre', 'azeite', 'oleo', 'caldo'],
  Bebidas: ['suco', 'refrigerante', 'agua', 'cerveja', 'vinho'],
  Limpeza: ['desinfetante', 'amaciante', 'desengordurante', 'detergente', 'esponja', 'saco de lixo', 'branqueador', 'anti mofo', 'sabao', 'agua sanitaria', 'alvejante', 'lustra moveis', 'multiuso'],
  Higiene: ['sabonete', 'sabonete liquido', 'creme dental', 'pasta de dente', 'papel higienico', 'shampoo', 'condicionador', 'lamina de barba', 'fio dental', 'escova de dente', 'cotonete', 'lencinho umedecido', 'desodorante', 'absorvente'],
  Utilidades: ['papel toalha', 'papel manteiga', 'papel aluminio', 'plastico filme', 'papel airfryer', 'filtro de agua', 'guardanapo', 'filtro de cafe', 'pilha'],
}

export const DEFAULT_SECTIONS = [...Object.keys(SECTION_KEYWORDS), FALLBACK_SECTION]

function matchesKeyword(normalizedName: string, keyword: string): boolean {
  return new RegExp(`(^|\\s)${keyword}s?(\\s|$)`).test(normalizedName)
}

/** Picks the section whose most specific (longest) keyword appears in the name. */
export function suggestSection(name: string): string {
  const normalized = normalizeText(name).replace(/[^a-z0-9\s]/g, ' ')
  let best = { section: FALLBACK_SECTION, length: 0 }

  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (keyword.length > best.length && matchesKeyword(normalized, keyword)) {
        best = { section, length: keyword.length }
      }
    }
  }
  return best.section
}

export interface SectionGroup<T> {
  section: string
  items: T[]
}

export function groupBySection<T extends Pick<Item, 'name' | 'section'>>(
  items: T[],
  sectionOrder: string[],
): SectionGroup<T>[] {
  const groups = new Map<string, T[]>()
  for (const item of items) {
    const list = groups.get(item.section) ?? []
    list.push(item)
    groups.set(item.section, list)
  }

  const rank = (section: string) => {
    const index = sectionOrder.indexOf(section)
    return index === -1 ? sectionOrder.length : index
  }

  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || compareText(a, b))
    .map(([section, list]) => ({ section, items: list.sort((a, b) => compareText(a.name, b.name)) }))
}
