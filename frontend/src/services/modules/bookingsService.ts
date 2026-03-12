import { baseApi } from "../baseApi";
import type { Booking, DeleteResponse } from "../../utils/types";

export const bookingsService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsService;
