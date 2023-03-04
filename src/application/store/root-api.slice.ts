import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { IAuthResponse } from 'features/authorization/type'
import { removeUser, setUser } from 'features/users/services'

import { API_URL } from 'shared/constants'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'get' }, api, extraOptions)

    console.log(refreshResult, 'Refresh access token')
    if (refreshResult.data) {
      // const user=refreshResult.
      api.dispatch(setUser((refreshResult.data as IAuthResponse).user))

      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log('Unauthorized user')
      api.dispatch(removeUser())
    }
  }
  return result
}

export const rootApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})