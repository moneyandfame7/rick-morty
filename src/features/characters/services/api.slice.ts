import { rootApi } from 'application/store/root-api.slice'

import type { ICharacter, IManyCharacter } from 'features/characters/type'

import { NavigationEnum } from 'shared/constants'

const characterApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyCharacters: builder.query<IManyCharacter, string | void>({
      query: (query: string) => `api/${NavigationEnum.CHARACTERS}?${query}`
    }),
    getOneCharacter: builder.query<ICharacter, number | void>({
      query: id => `api/${NavigationEnum.CHARACTERS}/${id}`
    })
  })
})

export const { useGetManyCharactersQuery, useGetOneCharacterQuery } = characterApi
