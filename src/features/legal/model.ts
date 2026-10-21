export interface LegalSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDocument {
  title: string
  /** Human-readable date of the last relevant change. */
  updated: string
  intro: string
  sections: LegalSection[]
}
