import { rootApi } from '../../../application/store'
import { NavigationEnum } from '../../../shared/constants/api'
import type { ILocation, IManyLocation } from '../type'

const locationApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getManyLocations: builder.query<IManyLocation, number | void>({
      query: (page = 1) => `/api/${NavigationEnum.LOCATIONS}?page=${page}`
    }),
    getOneLocation: builder.query<ILocation, number | void>({
      query: id => `/api/${NavigationEnum.LOCATIONS}/${id}`
    })
  })
})
export const { useGetManyLocationsQuery, useGetOneLocationQuery } = locationApi
