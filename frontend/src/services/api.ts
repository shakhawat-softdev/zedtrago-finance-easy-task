import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/authStorage";
import type {
  AgingReport,
  AuthTokenPayload,
  AuthUser,
  Booking,
  Commission,
  CommissionsReport,
  CreateLedgerTransactionPayload,
  Customer,
  CurrencyRate,
  DashboardReport,
  DeleteResponse,
  IntegrationConnector,
  Invoice,
  LedgerTransaction,
  LoginPayload,
  Payment,
  ProfitLossSummary,
  ReportFilter,
  Supplier,
  SyncJobPayload,
  SyncJobResponse,
  TaxReport,
  TrialBalance,
  User,
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
    "Commissions",
    "Currency",
    "Integrations",
    "Ledger",
    "Reporting",
    "Users",
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

    getBookings: builder.query<Booking[], void>({
      query: () => ({ url: "/bookings" }),
      providesTags: ["Bookings"],
    }),
    getBookingById: builder.query<Booking, string>({
      query: (id) => ({ url: `/bookings/${id}` }),
      providesTags: ["Bookings"],
    }),
    createBooking: builder.mutation<Booking, Omit<Booking, "id">>({
      query: (body) => ({ url: "/bookings", method: "POST", body }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation<
      Booking,
      { id: string; payload: Partial<Omit<Booking, "id">> }
    >({
      query: ({ id, payload }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation<DeleteResponse, string>({
      query: (id) => ({ url: `/bookings/${id}`, method: "DELETE" }),
      invalidatesTags: ["Bookings"],
    }),

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

    getCurrencyRates: builder.query<CurrencyRate[], void>({
      query: () => ({ url: "/currency-rates" }),
      providesTags: ["Currency"],
    }),
    getCurrencyRateByKey: builder.query<CurrencyRate, string>({
      query: (key) => ({ url: `/currency-rates/${key}` }),
      providesTags: ["Currency"],
    }),
    createCurrencyRate: builder.mutation<CurrencyRate, CurrencyRate>({
      query: (body) => ({ url: "/currency-rates", method: "POST", body }),
      invalidatesTags: ["Currency"],
    }),
    updateCurrencyRate: builder.mutation<
      CurrencyRate,
      { key: string; payload: Partial<CurrencyRate> }
    >({
      query: ({ key, payload }) => ({
        url: `/currency-rates/${key}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Currency"],
    }),
    deleteCurrencyRate: builder.mutation<DeleteResponse, string>({
      query: (key) => ({ url: `/currency-rates/${key}`, method: "DELETE" }),
      invalidatesTags: ["Currency"],
    }),

    listIntegrationConnectors: builder.query<IntegrationConnector[], void>({
      query: () => ({ url: "/integrations/connectors" }),
      providesTags: ["Integrations"],
    }),
    runSyncJob: builder.mutation<SyncJobResponse, SyncJobPayload>({
      query: (body) => ({
        url: "/integrations/sync-jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Integrations"],
    }),

    getLedgerTransactions: builder.query<LedgerTransaction[], void>({
      query: () => ({ url: "/ledger/transactions" }),
      providesTags: ["Ledger"],
    }),
    getLedgerTransactionById: builder.query<LedgerTransaction, string>({
      query: (id) => ({ url: `/ledger/transactions/${id}` }),
      providesTags: ["Ledger"],
    }),
    getTrialBalance: builder.query<TrialBalance, void>({
      query: () => ({ url: "/ledger/trial-balance" }),
      providesTags: ["Ledger"],
    }),
    createLedgerTransaction: builder.mutation<
      LedgerTransaction,
      CreateLedgerTransactionPayload
    >({
      query: (body) => ({ url: "/ledger/transactions", method: "POST", body }),
      invalidatesTags: ["Ledger"],
    }),

    getReportingDashboard: builder.query<
      DashboardReport,
      ReportFilter | undefined
    >({
      query: (params) => ({ url: "/reporting/dashboard", params }),
      providesTags: ["Reporting"],
    }),
    getReportingArAging: builder.query<AgingReport, ReportFilter | undefined>({
      query: (params) => ({ url: "/reporting/ar-aging", params }),
      providesTags: ["Reporting"],
    }),
    getReportingApAging: builder.query<AgingReport, ReportFilter | undefined>({
      query: (params) => ({ url: "/reporting/ap-aging", params }),
      providesTags: ["Reporting"],
    }),
    getReportingTax: builder.query<TaxReport, ReportFilter | undefined>({
      query: (params) => ({ url: "/reporting/tax", params }),
      providesTags: ["Reporting"],
    }),
    getReportingLedgerSummary: builder.query<
      TrialBalance,
      ReportFilter | undefined
    >({
      query: (params) => ({ url: "/reporting/ledger-summary", params }),
      providesTags: ["Reporting"],
    }),
    getReportingCommissions: builder.query<
      CommissionsReport,
      ReportFilter | undefined
    >({
      query: (params) => ({ url: "/reporting/commissions", params }),
      providesTags: ["Reporting"],
    }),
    getReportingPlSummary: builder.query<
      ProfitLossSummary,
      ReportFilter | undefined
    >({
      query: (params) => ({ url: "/reporting/pl-summary", params }),
      providesTags: ["Reporting"],
    }),

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

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useGetCommissionsQuery,
  useGetCommissionByIdQuery,
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
  useDeleteCommissionMutation,
  useGetCurrencyRatesQuery,
  useGetCurrencyRateByKeyQuery,
  useCreateCurrencyRateMutation,
  useUpdateCurrencyRateMutation,
  useDeleteCurrencyRateMutation,
  useListIntegrationConnectorsQuery,
  useRunSyncJobMutation,
  useGetLedgerTransactionsQuery,
  useGetLedgerTransactionByIdQuery,
  useGetTrialBalanceQuery,
  useCreateLedgerTransactionMutation,
  useGetReportingDashboardQuery,
  useGetReportingArAgingQuery,
  useGetReportingApAgingQuery,
  useGetReportingTaxQuery,
  useGetReportingLedgerSummaryQuery,
  useGetReportingCommissionsQuery,
  useGetReportingPlSummaryQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = api;
