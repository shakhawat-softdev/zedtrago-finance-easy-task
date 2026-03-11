import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/authStorage";
import type {
  AuthTokenPayload,
  AuthUser,
  Booking,
  Customer,
  Invoice,
  LoginPayload,
  Payment,
  Supplier,
} from "../utils/types";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_API_URL ?? "http://localhost:3000/api";

type LoginResponse = {
  accessToken: string;
  expiresIn: string;
  user: AuthUser;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Customers",
    "Bookings",
    "Invoices",
    "Payments",
    "Suppliers",
    "Auth",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<AuthTokenPayload, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["Auth"],
    }),

    getCustomers: builder.query<Customer[], void>({
      query: () => ({ url: "/customers" }),
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
    deleteCustomer: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({ url: `/customers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Customers"],
    }),

    getBookings: builder.query<Booking[], void>({
      query: () => ({ url: "/bookings" }),
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<Booking, Omit<Booking, "id">>({
      query: (body) => ({ url: "/bookings", method: "POST", body }),
      invalidatesTags: ["Bookings"],
    }),

    getInvoices: builder.query<Invoice[], void>({
      query: () => ({ url: "/invoices" }),
      providesTags: ["Invoices"],
    }),
    createInvoice: builder.mutation<
      Invoice,
      Omit<Invoice, "id" | "invoiceNumber">
    >({
      query: (body) => ({ url: "/invoices", method: "POST", body }),
      invalidatesTags: ["Invoices"],
    }),

    getPayments: builder.query<Payment[], void>({
      query: () => ({ url: "/payments" }),
      providesTags: ["Payments"],
    }),
    createPayment: builder.mutation<Payment, Omit<Payment, "id">>({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),

    getSuppliers: builder.query<Supplier[], void>({
      query: () => ({ url: "/suppliers" }),
      providesTags: ["Suppliers"],
    }),
    createSupplier: builder.mutation<Supplier, Omit<Supplier, "id">>({
      query: (body) => ({ url: "/suppliers", method: "POST", body }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetBookingsQuery,
  useCreateBookingMutation,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useGetSuppliersQuery,
  useCreateSupplierMutation,
} = api;
