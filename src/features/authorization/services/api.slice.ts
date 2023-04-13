import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { rootApi } from 'application/store'

import type { AuthCredentials, AuthResponse } from 'features/authorization/type'
import type { ForgotCredentials, ResetPasswordParams, UserWelcomeDetails } from 'features/users/type'

export const authApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: body => ({
        url: '/auth/login',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    signup: builder.mutation<AuthResponse, AuthCredentials>({
      query: body => ({
        url: '/auth/signup',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
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
    forgot: builder.mutation<void, ForgotCredentials>({
      query: body => ({
        url: '/auth/forgot',
        method: 'post',
        body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    }),
    reset: builder.mutation<AuthResponse, ResetPasswordParams>({
      query: details => ({
        url: `/auth/reset?id=${details.query.id}&token=${details.query.token}`,
        method: 'post',
        body: details.body
      }),
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return response.data
      }
    })
  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useWelcomeMutation,
  useVerificationSendMutation,
  useForgotMutation,
  useResetMutation
} = authApi
