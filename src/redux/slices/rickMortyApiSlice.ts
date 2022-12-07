import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICharacter, IEpisode } from "../../interfaces";
const BASE_URL = "";

interface IResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}
interface IFetchCharacters extends IResponse {
  results: ICharacter[];
}
interface IFetchEpisodes extends IResponse {
  results: IEpisode[];
}
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  endpoints: builder => ({
    fetchCharacters: builder.query<IFetchCharacters, number | void>({
      query: page => `/character?page=${page}`,
    }),
    fetchCharacterById: builder.query<ICharacter, number | void>({
      query: id => `/character/${id}`,
    }),
    fetchEpisodes: builder.query<IFetchEpisodes, number | void>({
      query: page => `/episode/?page=${page}`,
    }),
    fetchEpisodeById: builder.query<IEpisode, number | void>({
      query: id => `/episode/${id}`,
    }),
  }),
});

export const { useFetchCharactersQuery } = apiSlice;
