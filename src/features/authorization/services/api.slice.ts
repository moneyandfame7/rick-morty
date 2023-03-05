import { rootApi } from 'application/store'
import type { AuthCredentials, AuthResponse } from 'features/authorization/type'
import type { User, UserCurrentCountry, UserWelcomeDetails } from 'features/users/type'

/**
 * Якщо буде помилка, то повертається обʼєкт error.
 * Якщо successfully, то повертається обʼєкт data.
 **/

export const authApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
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
    signup: builder.mutation<AuthResponse, AuthCredentials>({
      query: body => ({
        url: '/auth/signup',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: any, meta, arg) => {
        return response.data
      }
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: () => {
        return {
          url: '/auth/logout',
          method: 'post'
        }
      }
    }),
    welcome: builder.mutation<AuthResponse, UserWelcomeDetails>({
      query: body => ({
        url: '/auth/welcome',
        method: 'post',
        body
      })
    }),
    verificationSend: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/resend-verification',
        method: 'post'
      })
    }),
    // TODO: на бекенді переробити endpoint, і зробити окремий api для юзера
    getUser: builder.query<User, void>({
      query: () => `/auth/profile`
    }),
    getCurrentCountry: builder.query<UserCurrentCountry, void>({
      query: () => 'https://ipapi.co/json'
    })
  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useWelcomeMutation,
  useVerificationSendMutation,
  useGetUserQuery,
  useGetCurrentCountryQuery
} = authApi
