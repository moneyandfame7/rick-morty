import { rootApi } from 'application/store/root-api.slice'

import type { Character, ManyCharacter } from 'features/characters/type'

import { NavigationEnum } from 'shared/constants'
import { CharacterFields } from '../constant'

const characterApi = rootApi.injectEndpoints({

  endpoints: builder => ({
    getManyCharacters: builder.query<ManyCharacter, string | void>({
      query: (query: string) => `api/${NavigationEnum.CHARACTERS}?${query}`
    }),
    getInfiniteCharacters: builder.query<ManyCharacter, string | void>({
      query: (query: string) => `api/${NavigationEnum.CHARACTERS}?${query}`,
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
      query: id => `api/${NavigationEnum.CHARACTERS}/${id}`
    }),
    getCharactersNames: builder.mutation<string[], string>({
      query: name => ({
        url: `/api/${NavigationEnum.CHARACTERS}/names`,
        body: {
          name
        },
        method: 'post'
      })
    }),
    getCharactersByFields: builder.query<{ [field: string]: string[] }, CharacterFields[]>({
      query: fields => ({
        url: `api/${NavigationEnum.CHARACTERS}/unique`,
        body: {
          fields
        }
      })
    }),
    getCountOfCharacters: builder.query<number, void>({
      query: () => `api/${NavigationEnum.CHARACTERS}/count`
    })
  })
})

export const {
  useGetManyCharactersQuery,
  useGetOneCharacterQuery,
  useGetCharactersNamesMutation,
  useGetCharactersByFieldsQuery,
  useGetInfiniteCharactersQuery,
  useGetCountOfCharactersQuery
} = characterApi
