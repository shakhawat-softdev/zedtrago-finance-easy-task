import { baseApi } from "../baseApi";
import type {
  AuthTokenPayload,
  AuthUser,
  LoginPayload,
} from "../../utils/types";

type LoginResponse = {
  accessToken: string;
  expiresIn: string;
  user: AuthUser;
};

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<AuthTokenPayload, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authService;
