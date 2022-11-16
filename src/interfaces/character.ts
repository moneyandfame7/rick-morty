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
