import { rootApi } from 'application/store/root-api.slice'

import { Navigation } from 'shared/constants'
import { User } from '../type'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${Navigation.USERS}/count`
    }),
    getUsers: builder.query<User[], void>({
      query: () => `api/${Navigation.USERS}`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    })
  })
})
export const { useGetCountOfUsersQuery, useGetUsersQuery } = userApi
