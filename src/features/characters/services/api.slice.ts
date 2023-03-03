import { rootApi } from '../../../application/store'
import { NavigationEnum } from '../../../shared/constants/api'
import type { ICharacter, IManyCharacter } from '../type'

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
