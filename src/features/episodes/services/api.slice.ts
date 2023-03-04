import { rootApi } from 'application/store/root-api.slice'
import type { IEpisode, IManyEpisode } from 'features/episodes/type'

import { NavigationEnum } from 'shared/constants'

const episodeApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyEpisodes: builder.query<IManyEpisode, number | void>({
      query: (page = 1) => `/api/${NavigationEnum.EPISODES}?page=${page}`
    }),
    getOneEpisode: builder.query<IEpisode, number | void>({
      query: id => `/api/${NavigationEnum.EPISODES}/${id}`
    })
  })
})

export const { useGetManyEpisodesQuery, useGetOneEpisodeQuery } = episodeApi
