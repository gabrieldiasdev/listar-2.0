/** Text limits, also enforced by firestore.rules. */
export const ITEM_LIMITS = { name: 80, section: 40, quantity: 40, note: 60 } as const

export interface Item {
  id: string
  name: string
  section: string
  needed: boolean
  /** Amount requested for the next purchase ("2 caixas"); cleared once bought. */
  quantity: string
  /** Lasting detail about the product ("light", "marca X"). */
  note: string
  inCart: boolean
  flaggedBy: string | null
  updatedAt: Date | null
}

export interface ItemDraft {
  name: string
  section: string
  note?: string
  quantity?: string
  needed?: boolean
}
