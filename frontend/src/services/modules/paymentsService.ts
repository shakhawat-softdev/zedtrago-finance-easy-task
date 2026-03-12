import { baseApi } from "../baseApi";
import type { Payment, DeleteResponse } from "../../utils/types";

export const paymentsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], void>({
      query: () => ({ url: "/payments" }),
      providesTags: ["Payments"],
    }),
    getPaymentById: builder.query<Payment, string>({
      query: (id) => ({ url: `/payments/${id}` }),
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation<Payment, Omit<Payment, "id">>({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),
    updatePayment: builder.mutation<
      Payment,
      { id: string; payload: Partial<Omit<Payment, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayment: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/payments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsService;
