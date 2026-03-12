import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/authStorage";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_API_URL ?? "http://localhost:3000/api";

export const baseApi = createApi({
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
  endpoints: () => ({}),
});
