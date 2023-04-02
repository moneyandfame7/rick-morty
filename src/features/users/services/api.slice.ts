import { rootApi } from 'application/store/root-api.slice'

import { NavigationEnum } from 'shared/constants'

const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getCountOfUsers: builder.query<number, void>({
      query: () => `api/${NavigationEnum.USERS}/count`
    })
  })
})
export const { useGetCountOfUsersQuery } = userApi
