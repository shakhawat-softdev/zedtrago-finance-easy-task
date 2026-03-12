import { baseApi } from "../baseApi";
import type { User } from "../../utils/types";

export const usersService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: "/users" }),
      providesTags: ["Users"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<
      User,
      { id: string; payload: Partial<Omit<User, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } =
  usersService;
