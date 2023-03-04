import { IPageInformation } from 'shared/types'

export interface ILocation {
  id: number
  name: string
  type: string
  dimension: string
  createdAt: Date
  residents: number[]
}

export interface IManyLocation {
  info: IPageInformation
  results: ILocation[]
}
