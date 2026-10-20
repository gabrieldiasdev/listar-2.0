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
