import { rootApi } from 'application/store/root-api.slice'
import type { Location, IManyLocation } from 'features/locations'

import { Navigation } from 'shared/constants'

const locationApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyLocations: builder.query<IManyLocation, number | void>({
      query: (page = 1) => `/api/${Navigation.LOCATIONS}?page=${page}`
    }),
    getOneLocation: builder.query<Location, number | void>({
      query: id => `/api/${Navigation.LOCATIONS}/${id}`
    }),
    getCountOfLocations: builder.query<number, void>({
      query: () => `api/${Navigation.LOCATIONS}/count`
    })
  })
})
export const { useGetManyLocationsQuery, useGetOneLocationQuery, useGetCountOfLocationsQuery } = locationApi
