import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store/root-api.slice'

import type { IEpisode, IManyEpisode } from 'features/episodes/type'

import { Navigation } from 'shared/constants'

interface ResultsType {
  data: IEpisode[]
  error: FetchBaseQueryError | undefined
}

const episodeApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyEpisodes: builder.query<IManyEpisode, number | void>({
      query: (page = 1) => `/api/${Navigation.EPISODES}?page=${page}`
    }),
    getOneEpisode: builder.query<IEpisode, number>({
      query: id => `/api/${Navigation.EPISODES}/${id}`
    }),
    getCountOfEpisodes: builder.query<number, void>({
      query: () => `/api/${Navigation.EPISODES}/count`
    }),
    getListOfEpisodes: builder.query<IEpisode[], number[]>({
      queryFn: async (ids, _queryApi, _extraOptions, fetchWithBQ) => {
        const results: ResultsType = {
          data: [],
          error: undefined
        }
        for (const id of ids) {
          const episode = await fetchWithBQ(`/api/episodes/${id}`)
          if (episode.data) {
            results.data.push(episode.data as IEpisode)
          } else if (episode.error) {
            results.error = episode.error
          }
        }

        return results.data ? { data: results.data as IEpisode[] } : { error: results.error as FetchBaseQueryError }
      }
    })
  })
})

export const { useGetManyEpisodesQuery, useGetOneEpisodeQuery, useGetCountOfEpisodesQuery, useGetListOfEpisodesQuery } =
  episodeApi
