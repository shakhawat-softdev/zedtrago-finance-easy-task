import { baseApi } from "../baseApi";
import type {
  AgingReport,
  CommissionsReport,
  DashboardReport,
  ProfitLossSummary,
  ReportFilter,
  TaxReport,
  TrialBalance,
} from "../../utils/types";

export const reportingService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetReportingDashboardQuery,
  useGetReportingArAgingQuery,
  useGetReportingApAgingQuery,
  useGetReportingTaxQuery,
  useGetReportingLedgerSummaryQuery,
  useGetReportingCommissionsQuery,
  useGetReportingPlSummaryQuery,
} = reportingService;
