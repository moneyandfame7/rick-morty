import { baseApi } from "./base";
import { AuthCredentials, AuthResponse, Token, User } from "../../interfaces/auth";
import { removeLocalStorage } from "../../utils/localStorage";
import { LOCALSTORAGE_USER } from "../../constants/api";

/**
 * Якщо буде помилка, то повертається обʼєкт error.
 * Якщо successfully, то повертається обʼєкт data.
 **/
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: body => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
      transformErrorResponse: (response: any, meta, arg) => {
        return response.data;
      },
      transformResponse: (response: any, meta, arg) => {
        return response;
      },
    }),
    signup: builder.mutation<AuthResponse, AuthCredentials>({
      query: body => ({
        url: "/auth/signup",
        method: "post",
        body,
      }),
      transformErrorResponse: (response: any, meta, arg) => {
        return response.data;
      },
    }),
    logout: builder.mutation<Token, void>({
      query: () => {
        removeLocalStorage(LOCALSTORAGE_USER);
        return {
          url: "/auth/logout",
          method: "post",
        };
      },
    }),
    getUser: builder.query<User, void>({
      query: () => `/auth/profile`,
    }),
  }),
});

// todo: на бекенді переробити endpoint, і зробити окремий api для юзера
export const { useLoginMutation, useSignupMutation, useLogoutMutation, useGetUserQuery } = authApi;
