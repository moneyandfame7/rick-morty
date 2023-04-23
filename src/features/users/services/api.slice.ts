import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store/root-api.slice'
import { type AuthResponse } from 'features/authorization/type'

import type { EditSettings, GetManyUsers, UpdatePassword, UpdateUser, User } from 'features/users/type'

import { Navigation } from 'shared/constants'
import type { UserPagination } from 'shared/types'

const transformErrorResponse = {
  transformErrorResponse: (response: FetchBaseQueryError) => {
    return response.data
  }
}

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${Navigation.USERS}/count`,
      ...transformErrorResponse
    }),
    getUsers: builder.query<GetManyUsers, UserPagination>({
      query: ({ page, pageSize }) => ({
        url: `api/${Navigation.USERS}`,
        method: 'GET',
        params: { page, pageSize }
      }),
      ...transformErrorResponse
    }),
    getUser: builder.query<User, string>({
      query: id => `api/${Navigation.USERS}/${id}`,
      ...transformErrorResponse
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: ({ id, updated }) => ({
        url: `api/${Navigation.USERS}/${id}`,
        method: 'PATCH',
        body: updated
      }),
      ...transformErrorResponse
    }),
    editSettings: builder.mutation<User, EditSettings>({
      query: body => ({
        url: `api/${Navigation.USERS}/settings`,
        method: 'PATCH',
        body
      }),
      ...transformErrorResponse
    }),
    uploadPhoto: builder.mutation<User, FormData>({
      query: body => ({
        url: `api/${Navigation.USERS}/photo`,
        method: 'POST',
        body
      }),
      ...transformErrorResponse
    }),
    deleteUsers: builder.mutation<void, string[]>({
      query: ids => ({
        url: `api/${Navigation.USERS}`,
        method: 'DELETE',
        body: { ids }
      }),
      ...transformErrorResponse
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `api/${Navigation.USERS}/${id}`,
        method: 'DELETE'
      }),
      ...transformErrorResponse
    }),
    updatePassword: builder.mutation<User, UpdatePassword>({
      query: body => ({
        url: `api/${Navigation.USERS}/update-password`,
        method: 'POST',
        body
      }),
      ...transformErrorResponse
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
  useUpdatePasswordMutation,
  useUploadPhotoMutation,
  useDeleteUsersMutation,
  useDeleteUserMutation
} = userApi
