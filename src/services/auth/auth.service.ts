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
      signUp: builder.mutation<SignUpResponseType, SignUpArgsType>({
        query: (body) => ({
          url: "v1/auth/sign-up",
          method: "POST",
          body,
        }),
        // invalidatesTags: ["Auth"],
      }),
      verifyEmail: builder.mutation<void, { code: string }>({
        query: (body) => ({
          url: "v1/auth/verify-email",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      }),
      resendVerification: builder.mutation<any, any>({
        query: (body) => ({
          url: "v1/auth/resend-verification-email",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      }),
    };
  },
});

export const {
  useLoginMutation,
  useAuthMeQuery,
  useLogoutMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = AuthService;

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

export type SignUpArgsType = {
  name: string;
  password: string;
  email: string;
};

export type SignUpResponseType = {
  avatar?: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created?: string;
  updated?: string;
};
