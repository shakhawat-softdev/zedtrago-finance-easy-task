import { baseApi } from "../baseApi";
import type { Commission, DeleteResponse } from "../../utils/types";

export const commissionsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommissions: builder.query<Commission[], void>({
      query: () => ({ url: "/commissions" }),
      providesTags: ["Commissions"],
    }),
    getCommissionById: builder.query<Commission, string>({
      query: (id) => ({ url: `/commissions/${id}` }),
      providesTags: ["Commissions"],
    }),
    createCommission: builder.mutation<Commission, Omit<Commission, "id">>({
      query: (body) => ({ url: "/commissions", method: "POST", body }),
      invalidatesTags: ["Commissions"],
    }),
    updateCommission: builder.mutation<
      Commission,
      { id: string; payload: Partial<Omit<Commission, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/commissions/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Commissions"],
    }),
    deleteCommission: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/commissions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Commissions"],
    }),
  }),
});

export const {
  useGetCommissionsQuery,
  useGetCommissionByIdQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
} = commissionsService;
