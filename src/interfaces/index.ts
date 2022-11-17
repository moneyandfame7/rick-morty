export interface ICharacter {
  id: number
  created: string
  episode: Array<string>
  gender: string
  image: string
  location: {
    name: string
    url: string
  }
  name: string
  url: string
  origin: {
    name: string
    url: string
  }
  species: string
  status: string
}

export interface IEpisode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface ILocation {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string[]
  created: string
}
