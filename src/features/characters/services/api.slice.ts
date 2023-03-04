import { rootApi } from 'application/store/root-api.slice'

import type { ICharacter, IManyCharacter } from 'features/characters/type'

import { NavigationEnum } from 'shared/constants'

const characterApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyCharacters: builder.query<IManyCharacter, number | void>({
      query: (page = 1) => `api/${NavigationEnum.CHARACTERS}?page=${page}`
    }),
    getOneCharacter: builder.query<ICharacter, number | void>({
      query: id => `api/${NavigationEnum.CHARACTERS}/${id}`
    })
  })
})

export const { useGetManyCharactersQuery, useGetOneCharacterQuery } = characterApi
