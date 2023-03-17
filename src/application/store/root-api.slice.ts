import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { AuthResponse } from 'features/authorization/type'
import { removeUser, setUser } from 'features/users/services'

import { API_URL } from 'shared/constants'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    return headers
  }
})

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    try {
      const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'get' }, api, extraOptions)

      console.log(refreshResult, 'Refresh access token')
      if (refreshResult.data) {
        // const user=refreshResult.
        api.dispatch(setUser((refreshResult.data as AuthResponse).user))

        result = await baseQuery(args, api, extraOptions)
      } else {
        console.log('Unauthorized user')
        api.dispatch(removeUser())
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
  }
  return result
}

export const rootApi = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: builder => ({})
})
