import type { ILocation } from 'features/locations/type'

import type { IPageInformation } from 'shared/types'

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterLocation = Omit<ILocation, 'residents'>

export interface ICharacter {
  id: number
  status: CharacterGender
  name: string
  species: string
  gender: CharacterStatus
  type: string
  image: string
  createdAt: Date
  origin: CharacterLocation
  location: CharacterLocation
  episodes: number[]
}

export interface IManyCharacter {
  info: IPageInformation
  results: ICharacter[]
}
