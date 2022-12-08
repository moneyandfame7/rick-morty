import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICharacter, IEpisode, IResponseCharacter, IResponseEpisode } from "../../interfaces";
import { BASE_URL, NavigationTypeEnum } from "../../constants/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    fetchCharacters: builder.query<IResponseCharacter, number | void>({
      query: (page = 1) => `${NavigationTypeEnum.CHARACTER}/?page=${page}`,
    }),
    fetchCharacterById: builder.query<ICharacter, number | void>({
      query: id => `/${NavigationTypeEnum.CHARACTER}/${id}`,
    }),
    fetchEpisodes: builder.query<IResponseEpisode, number | void>({
      query: page => `/${NavigationTypeEnum.EPISODE}/?page=${page}`,
    }),
    fetchEpisodeById: builder.query<IEpisode, number | void>({
      query: id => `/${NavigationTypeEnum.EPISODE}/${id}`,
    }),
  }),
});

export const { useFetchCharactersQuery, useFetchCharacterByIdQuery, useFetchEpisodesQuery, useFetchEpisodeByIdQuery } =
  apiSlice;
