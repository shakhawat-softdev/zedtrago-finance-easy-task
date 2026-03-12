import { baseApi } from "../baseApi";
import type { Customer, DeleteResponse } from "../../utils/types";

export const customersService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => ({ url: "/customers" }),
      providesTags: ["Customers"],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (id) => ({ url: `/customers/${id}` }),
      providesTags: ["Customers"],
    }),
    createCustomer: builder.mutation<Customer, Omit<Customer, "id">>({
      query: (body) => ({ url: "/customers", method: "POST", body }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation<
      Customer,
      { id: string; payload: Partial<Omit<Customer, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/customers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersService;
