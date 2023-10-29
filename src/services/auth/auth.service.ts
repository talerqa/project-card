import { baseApi } from "../base-api";

export const AuthService = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      authMe: builder.query<AuthMeResponseType, void>({
        query: () => ({
          url: "v1/auth/me",
          method: "GET",
        }),
        providesTags: ["Auth"],
      }),
      login: builder.mutation<LoginResponseType, LoginArgsType>({
        query: (body) => ({
          url: "v1/auth/login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          url: "v1/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["Auth"],
      }),
    };
  },
});

export const { useLoginMutation, useAuthMeQuery, useLogoutMutation } =
  AuthService;

export type AuthMeResponseType = {
  avatar: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created: string;
  updated: string;
};

export type LoginArgsType = {
  password: string;
  email: string;
  rememberMe?: boolean;
};

export type LoginResponseType = {
  accessToken: string;
};