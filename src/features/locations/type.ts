import { PageInformation } from 'shared/types'

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  createdAt: Date
  residents: number[]
}

export interface IManyLocation {
  info: PageInformation
  results: Location[]
}
