import { baseApi } from "../baseApi";
import type { CurrencyRate, DeleteResponse } from "../../utils/types";

export const currencyService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetCurrencyRatesQuery,
  useGetCurrencyRateByKeyQuery,
  useCreateCurrencyRateMutation,
  useUpdateCurrencyRateMutation,
  useDeleteCurrencyRateMutation,
} = currencyService;
