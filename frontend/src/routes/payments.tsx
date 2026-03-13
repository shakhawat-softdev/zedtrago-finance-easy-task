import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { PaymentsPage } from "../pages/payments/PaymentsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/payments",
  component: PaymentsPage,
});
