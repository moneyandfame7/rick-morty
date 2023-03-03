import { baseApi } from "./base";
import { ICharacter, IResponseCharacter } from "../../interfaces";
import { NavigationTypeEnum } from "../../constants/api";

const characterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManyCharacters: builder.query<IResponseCharacter, number | void>({
      query: (page = 1) => `api/${NavigationTypeEnum.CHARACTERS}?page=${page}`,
    }),
    getOneCharacter: builder.query<ICharacter, number | void>({
      query: id => `api/${NavigationTypeEnum.CHARACTERS}/${id}`,
    }),
  }),
});

export const { useGetManyCharactersQuery, useGetOneCharacterQuery } = characterApi;
