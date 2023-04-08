import type { Location } from 'features/locations/type'

import type { PageInformation } from 'shared/types'

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
export type CharacterLocation = Omit<Location, 'residents'>

export interface Character {
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

export interface ManyCharacter {
  info: PageInformation
  results: Character[]
}

export interface CreateCharacter {
  name: string
  type: string
  status: CharacterStatus
  gender: CharacterGender
  species: string
  image: File
}
