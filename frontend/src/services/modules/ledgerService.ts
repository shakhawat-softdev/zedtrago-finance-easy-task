import { baseApi } from "../baseApi";
import type {
  LedgerTransaction,
  CreateLedgerTransactionPayload,
  TrialBalance,
} from "../../utils/types";

export const ledgerService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetLedgerTransactionsQuery,
  useGetLedgerTransactionByIdQuery,
  useGetTrialBalanceQuery,
  useCreateLedgerTransactionMutation,
} = ledgerService;
