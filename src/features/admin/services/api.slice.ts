import { rootApi } from '@application/store/root-api.slice'

import { Navigation } from '@shared/constants'

import type { RecentUsers, UserStatistics } from '@features/admin/type'

const adminApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getUserStatistics: builder.query<UserStatistics, void>({
      query: () => `api/${Navigation.USERS}/statistics`
    }),
    getRecentUsers: builder.query<RecentUsers[], void>({
      query: () => `api/${Navigation.USERS}/recent`
    })
  })
})

export const { useGetUserStatisticsQuery, useGetRecentUsersQuery } = adminApi
