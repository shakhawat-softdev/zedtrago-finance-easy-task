import { baseApi } from "../baseApi";
import type { Supplier, DeleteResponse } from "../../utils/types";

export const suppliersService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<Supplier[], void>({
      query: () => ({ url: "/suppliers" }),
      providesTags: ["Suppliers"],
    }),
    getSupplierById: builder.query<Supplier, string>({
      query: (id) => ({ url: `/suppliers/${id}` }),
      providesTags: ["Suppliers"],
    }),
    createSupplier: builder.mutation<Supplier, Omit<Supplier, "id">>({
      query: (body) => ({ url: "/suppliers", method: "POST", body }),
      invalidatesTags: ["Suppliers"],
    }),
    updateSupplier: builder.mutation<
      Supplier,
      { id: string; payload: Partial<Omit<Supplier, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/suppliers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersService;
