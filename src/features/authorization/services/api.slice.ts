import { rootApi } from '../../../application/store'
import { removeLocalStorage } from '../../../utils/localStorage'
import type { IAuthCredentials, IAuthResponse } from '../type'
import { IUser } from '../../users/type'

/**
 * Якщо буде помилка, то повертається обʼєкт error.
 * Якщо successfully, то повертається обʼєкт data.
 **/
export const authApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IAuthResponse, IAuthCredentials>({
      query: body => ({
        url: '/auth/login',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: any, meta, arg) => {
        return response.data
      },
      transformResponse: (response: any, meta, arg) => {
        return response
      }
    }),
    signup: builder.mutation<IAuthResponse, IAuthCredentials>({
      query: body => ({
        url: '/auth/signup',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: any, meta, arg) => {
        return response.data
      }
    }),
    logout: builder.mutation<IAuthResponse, void>({
      query: () => {
        return {
          url: '/auth/logout',
          method: 'post'
        }
      }
    }),
    getUser: builder.query<IUser, void>({
      query: () => `/auth/profile`
    })
  })
})

// todo: на бекенді переробити endpoint, і зробити окремий api для юзера
export const { useLoginMutation, useSignupMutation, useLogoutMutation, useGetUserQuery } = authApi
