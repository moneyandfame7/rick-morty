import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from '@application/store/root-api.slice'

import type { Character, ManyCharacter } from '@characters/type'
import { CharacterFields } from '@characters/constant'

import { Navigation } from '@shared/constants'

const characterApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyCharacters: builder.query<ManyCharacter, string | void>({
      query: (query: string) => `api/${Navigation.CHARACTERS}?${query}`
    }),
    getInfiniteCharacters: builder.query<ManyCharacter, string | void>({
      query: (query: string) => `api/${Navigation.CHARACTERS}?${query}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    }),
    getOneCharacter: builder.query<Character, number | void>({
      query: id => `api/${Navigation.CHARACTERS}/${id}`
    }),
    getCharactersNames: builder.mutation<string[], string>({
      query: name => ({
        url: `/api/${Navigation.CHARACTERS}/names`,
        body: {
          name
        },
        method: 'post'
      })
    }),
    getCharactersByFields: builder.query<{ [field: string]: string[] }, CharacterFields[]>({
      query: fields => ({
        url: `api/${Navigation.CHARACTERS}/unique`,
        body: {
          fields
        }
      })
    }),
    getCountOfCharacters: builder.query<number, void>({
      query: () => `api/${Navigation.CHARACTERS}/count`
    }),
    getCharactersImages: builder.query<string[], void>({
      query: () => `api/${Navigation.CHARACTERS}/images`
    }),
    createCharacter: builder.mutation<Character, FormData>({
      query: body => ({
        url: `api/${Navigation.CHARACTERS}`,
        body,
        method: 'post'
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    })
  })
})

export const {
  useGetManyCharactersQuery,
  useGetOneCharacterQuery,
  useGetCharactersNamesMutation,
  useGetCharactersByFieldsQuery,
  useGetInfiniteCharactersQuery,
  useGetCountOfCharactersQuery,
  useGetCharactersImagesQuery,
  useCreateCharacterMutation
} = characterApi
