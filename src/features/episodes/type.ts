import type { PageInformation } from 'shared/types'

export interface IEpisode {
  id: number
  name: string
  episode: string
  airDate: string
  createdAt: string
  characters: number[]
}

export interface IManyEpisode {
  info: PageInformation
  results: IEpisode[]
}
