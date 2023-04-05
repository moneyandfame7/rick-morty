import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { environmentsConfig } from 'application/config'

import type { AuthResponse } from 'features/authorization/type'
import { removeUser, setUser } from 'features/users/services/user.slice'

const baseQuery = fetchBaseQuery({
  baseUrl: environmentsConfig.apiUrl,
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
      console.log(refreshResult)
      if (refreshResult.data) {
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
  endpoints: () => ({})
})
