import type { Locale } from '@/i18n/locales'
import { compareText, normalizeText } from '@/lib/text'
import type { Item } from './model'

interface SectionDefinition {
  labels: Record<Locale, string>
  /** Accent-free, lowercase; both Brazilian and European vocabulary. A trailing "s" also matches. */
  keywords: string[]
}

const FALLBACK_ID = 'other'

const SECTIONS = {
  produce: {
    labels: { 'pt-BR': 'Hortifruti', 'pt-PT': 'Frutas e legumes' },
    keywords: ['fruta', 'legume', 'verdura', 'ovo', 'banana', 'maca', 'laranja', 'limao', 'tomate', 'cebola', 'alho', 'batata', 'cenoura', 'alface', 'pera', 'uva', 'morango', 'couve', 'brocolo', 'brocolis', 'abobora', 'courgette', 'abobrinha', 'pepino', 'pimento', 'pimentao', 'cogumelo'],
  },
  meat: {
    labels: { 'pt-BR': 'Carnes e peixes', 'pt-PT': 'Talho e peixaria' },
    keywords: ['carne', 'frango', 'peixe', 'linguica', 'bife', 'file', 'costela', 'salsicha', 'peru', 'porco', 'vaca', 'bacalhau', 'salmao', 'pescada', 'dourada', 'robalo', 'camarao', 'hamburguer', 'carne picada', 'carne moida'],
  },
  dairy: {
    labels: { 'pt-BR': 'Frios e laticínios', 'pt-PT': 'Charcutaria e lacticínios' },
    keywords: ['leite', 'queijo', 'manteiga', 'margarina', 'iogurte', 'requeijao', 'mussarela', 'mozzarella', 'nata', 'presunto', 'fiambre', 'chourico', 'mortadela', 'queijo fresco', 'kefir'],
  },
  bakery: {
    labels: { 'pt-BR': 'Padaria', 'pt-PT': 'Padaria' },
    keywords: ['pao', 'pao de forma', 'bisnaguinha', 'torrada', 'tosta', 'mini tosta', 'broa', 'croissant', 'bolo'],
  },
  breakfast: {
    labels: { 'pt-BR': 'Matinais e doces', 'pt-PT': 'Pequeno-almoço e doces' },
    keywords: ['cafe', 'cha', 'acucar', 'adocante', 'aveia', 'mel', 'bolacha', 'biscoito', 'pipoca', 'leite condensado', 'baunilha', 'chocolate', 'achocolatado', 'granola', 'cereal', 'cereais', 'compota', 'geleia', 'marmelada'],
  },
  pantry: {
    labels: { 'pt-BR': 'Mercearia', 'pt-PT': 'Mercearia' },
    keywords: ['arroz', 'feijao', 'macarrao', 'massa', 'esparguete', 'lasanha', 'farinha', 'farinha de rosca', 'pao ralado', 'atum', 'sardinha', 'ervilha', 'grao', 'grao de bico', 'lentilha', 'milho', 'azeitona', 'creme de leite', 'natas', 'fuba', 'polpa de tomate'],
  },
  sauces: {
    labels: { 'pt-BR': 'Molhos e temperos', 'pt-PT': 'Molhos e temperos' },
    keywords: ['molho', 'molho de tomate', 'maionese', 'catchup', 'ketchup', 'mostarda', 'tempero', 'sal', 'vinagre', 'azeite', 'oleo', 'caldo', 'pimenta', 'oregaos', 'oregano', 'piri piri'],
  },
  drinks: {
    labels: { 'pt-BR': 'Bebidas', 'pt-PT': 'Bebidas' },
    keywords: ['suco', 'sumo', 'refrigerante', 'agua', 'cerveja', 'vinho', 'agua com gas'],
  },
  cleaning: {
    labels: { 'pt-BR': 'Limpeza', 'pt-PT': 'Limpeza' },
    keywords: ['desinfetante', 'amaciante', 'amaciador', 'desengordurante', 'detergente', 'esponja', 'esfregao', 'saco de lixo', 'branqueador', 'anti mofo', 'sabao', 'agua sanitaria', 'lixivia', 'alvejante', 'lustra moveis', 'multiuso', 'pastilhas maquina', 'tira nodoas'],
  },
  hygiene: {
    labels: { 'pt-BR': 'Higiene', 'pt-PT': 'Higiene' },
    keywords: ['sabonete', 'sabonete liquido', 'gel de banho', 'creme dental', 'pasta de dente', 'pasta de dentes', 'papel higienico', 'shampoo', 'champo', 'condicionador', 'amaciador de cabelo', 'lamina de barba', 'lamina', 'fio dental', 'escova de dente', 'escova de dentes', 'cotonete', 'lencinho umedecido', 'toalhita', 'desodorante', 'desodorizante', 'absorvente', 'penso higienico'],
  },
  household: {
    labels: { 'pt-BR': 'Utilidades', 'pt-PT': 'Utilidades' },
    keywords: ['papel toalha', 'rolo de cozinha', 'papel de cozinha', 'papel manteiga', 'papel vegetal', 'papel aluminio', 'plastico filme', 'pelicula aderente', 'papel airfryer', 'filtro de agua', 'guardanapo', 'filtro de cafe', 'pilha', 'fosforo', 'vela'],
  },
  [FALLBACK_ID]: {
    labels: { 'pt-BR': 'Outros', 'pt-PT': 'Outros' },
    keywords: [],
  },
} satisfies Record<string, SectionDefinition>

type SectionId = keyof typeof SECTIONS

export function defaultSections(locale: Locale): string[] {
  return Object.values(SECTIONS).map((section) => section.labels[locale])
}

function keywordPosition(normalizedName: string, keyword: string): number {
  const match = new RegExp(`(^|\\s)${keyword}s?(?=\\s|$)`).exec(normalizedName)
  return match ? match.index : -1
}

/**
 * Picks the section of the keyword that appears earliest in the name, then the longest one.
 * Portuguese puts the main noun first ("sumo de laranja", "molho de tomate"), so position wins.
 */
function classify(name: string): SectionId {
  const normalized = normalizeText(name).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ')
  let best: { id: SectionId; position: number; length: number } = { id: FALLBACK_ID, position: Infinity, length: 0 }

  for (const [id, section] of Object.entries(SECTIONS) as [SectionId, SectionDefinition][]) {
    for (const keyword of section.keywords) {
      const position = keywordPosition(normalized, keyword)
      if (position === -1) continue
      if (position < best.position || (position === best.position && keyword.length > best.length)) {
        best = { id, position, length: keyword.length }
      }
    }
  }
  return best.id
}

/**
 * Suggests a section name for an item. Households keep the section names they were created with,
 * so any locale's label already in the household wins over the current locale's label.
 */
export function suggestSection(name: string, householdSections: readonly string[], locale: Locale): string {
  const { labels } = SECTIONS[classify(name)]
  return Object.values(labels).find((label) => householdSections.includes(label)) ?? labels[locale]
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
