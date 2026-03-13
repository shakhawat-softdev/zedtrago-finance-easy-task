import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { BookingsPage } from "../pages/bookings/BookingsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/bookings",
  component: BookingsPage,
});
