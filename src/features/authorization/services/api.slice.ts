import { rootApi } from 'application/store'
import type { AuthCredentials, AuthResponse } from 'features/authorization/type'
import type { User, UserCurrentCountry, UserWelcomeDetails } from 'features/users/type'

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
    }),
    googleLogin: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/google/login',
        method: 'post'
      })
    }),
    discordLogin: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/discord/login',
        method: 'post'
      })
    }),
    spotifyLogin: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/spotify/login',
        method: 'post'
      })
    }),
    githubLogin: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/github/login',
        method: 'post'
      })
    })
  })
})

export const {
  useLoginMutation,
  useDiscordLoginMutation,
  useGithubLoginMutation,
  useGoogleLoginMutation,
  useSpotifyLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useWelcomeMutation,
  useVerificationSendMutation,
  useGetUserQuery,
  useGetCurrentCountryQuery
} = authApi
