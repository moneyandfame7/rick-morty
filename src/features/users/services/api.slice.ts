import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store/root-api.slice'

import type { GetManyUsers, UpdateUser, User } from 'features/users/type'

import { Navigation } from 'shared/constants'
import type { Pagination } from 'shared/types'

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${Navigation.USERS}/count`
    }),
    getUsers: builder.query<GetManyUsers, Pagination>({
      query: ({ page, pageSize }) => ({
        url: `api/${Navigation.USERS}`,
        method: 'GET',
        params: { page, pageSize }
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: ({ id, updated }) => ({
        url: `api/${Navigation.USERS}/${id}`,
        method: 'PATCH',
        body: updated
      })
    }),
    deleteUsers: builder.mutation<void, string[]>({
      query: ids => ({
        url: `api/${Navigation.USERS}`,
        method: 'DELETE',
        body: { ids }
      })
    })
  })
})
export const { useGetCountOfUsersQuery, useLazyGetUsersQuery, useUpdateUserMutation, useDeleteUsersMutation } = userApi
