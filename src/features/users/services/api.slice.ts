import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store/root-api.slice'

import type { EditSettings, GetManyUsers, UpdateUser, User } from 'features/users/type'

import { Navigation } from 'shared/constants'
import type { UserPagination } from 'shared/types'

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${Navigation.USERS}/count`
    }),
    getUsers: builder.query<GetManyUsers, UserPagination>({
      query: ({ page, pageSize }) => ({
        url: `api/${Navigation.USERS}`,
        method: 'GET',
        params: { page, pageSize }
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    getUser: builder.query<User, string>({
      query: id => `api/${Navigation.USERS}/${id}`
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: ({ id, updated }) => ({
        url: `api/${Navigation.USERS}/${id}`,
        method: 'PATCH',
        body: updated
      })
    }),
    editSettings: builder.mutation<User, EditSettings>({
      query: body => ({
        url: `api/${Navigation.USERS}/settings`,
        method: 'PATCH',
        body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    uploadPhoto: builder.mutation<User, FormData>({
      query: body => ({
        url: `api/${Navigation.USERS}/photo`,
        method: 'POST',
        body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    deleteUsers: builder.mutation<void, string[]>({
      query: ids => ({
        url: `api/${Navigation.USERS}`,
        method: 'DELETE',
        body: { ids }
      })
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `api/${Navigation.USERS}/${id}`,
        method: 'DELETE'
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    })
  })
})
export const {
  useGetCountOfUsersQuery,
  useLazyGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useEditSettingsMutation,
  useUploadPhotoMutation,
  useDeleteUsersMutation,
  useDeleteUserMutation
} = userApi
