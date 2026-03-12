import { baseApi } from "../baseApi";
import type { Invoice, DeleteResponse } from "../../utils/types";

export const invoicesService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], void>({
      query: () => ({ url: "/invoices" }),
      providesTags: ["Invoices"],
    }),
    getInvoiceById: builder.query<Invoice, string>({
      query: (id) => ({ url: `/invoices/${id}` }),
      providesTags: ["Invoices"],
    }),
    createInvoice: builder.mutation<
      Invoice,
      Omit<Invoice, "id" | "invoiceNumber">
    >({
      query: (body) => ({ url: "/invoices", method: "POST", body }),
      invalidatesTags: ["Invoices"],
    }),
    updateInvoice: builder.mutation<
      Invoice,
      { id: string; payload: Partial<Omit<Invoice, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/invoices/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Invoices"],
    }),
    deleteInvoice: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/invoices/${id}`, method: "DELETE" }),
      invalidatesTags: ["Invoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoicesService;
