import { rootApi } from 'application/store/root-api.slice'

import type { ICharacter, IManyCharacter } from 'features/characters/type'

import { NavigationEnum } from 'shared/constants'
import { CharacterFields } from '../constant'

const characterApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyCharacters: builder.query<IManyCharacter, string | void>({
      query: (query: string) => `api/${NavigationEnum.CHARACTERS}?${query}`
    }),
    getOneCharacter: builder.query<ICharacter, number | void>({
      query: id => `api/${NavigationEnum.CHARACTERS}/${id}`
    }),
    getCharactersNames: builder.mutation<string[], string>({
      query: name => ({
        url: '/api/characters/names',
        body: {
          name
        },
        method: 'post'
      })
    }),
    getCharactersByFields: builder.query<{ [field: string]: string[] }, CharacterFields>({
      query: () => 'api/characters/unique'
    })
  })
})

export const {
  useGetManyCharactersQuery,
  useGetOneCharacterQuery,
  useGetCharactersNamesMutation,
  useGetCharactersByFieldsQuery
} = characterApi
