import { createContext, use } from 'react'
import type { Item } from '@/features/items/model'
import type { Household } from './model'

export interface CurrentMember {
  id: string
  name: string
}

export interface HouseholdContextValue {
  household: Household
  items: Item[]
  me: CurrentMember
  memberName: (userId: string | null) => string | null
}

export const HouseholdContext = createContext<HouseholdContextValue | null>(null)

export function useHousehold(): HouseholdContextValue {
  const context = use(HouseholdContext)
  if (!context) throw new Error('useHousehold must be used within HouseholdProvider')
  return context
}
