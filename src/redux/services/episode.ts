import { baseApi } from "./base";
import { IEpisode, IResponseEpisode } from "../../interfaces";
import { NavigationTypeEnum } from "../../constants/api";

const episodeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManyEpisodes: builder.query<IResponseEpisode, number | void>({
      query: (page = 1) => `/api/${NavigationTypeEnum.EPISODES}?page=${page}`,
    }),
    getOneEpisode: builder.query<IEpisode, number | void>({
      query: id => `/api/${NavigationTypeEnum.EPISODES}/${id}`,
    }),
  }),
});

export const { useGetManyEpisodesQuery, useGetOneEpisodeQuery } = episodeApi;
