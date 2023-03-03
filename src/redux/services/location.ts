import { baseApi } from "./base";
import { ILocation, IResponseLocation } from "../../interfaces";
import { NavigationTypeEnum } from "../../constants/api";

const locationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getManyLocations: builder.query<IResponseLocation, number | void>({
      query: (page = 1) => `/api/${NavigationTypeEnum.LOCATIONS}?page=${page}`,
    }),
    getOneLocation: builder.query<ILocation, number | void>({
      query: id => `/api/${NavigationTypeEnum.LOCATIONS}/${id}`,
    }),
  }),
});
export const { useGetManyLocationsQuery, useGetOneLocationQuery } = locationApi;
