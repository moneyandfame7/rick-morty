import { rootApi } from 'application/store/root-api.slice'

import { Navigation } from 'shared/constants'

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${Navigation.USERS}/count`
    })
  })
})
export const { useGetCountOfUsersQuery } = userApi
