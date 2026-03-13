import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { InvoicesPage } from "../pages/invoices/InvoicesPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/invoices",
  component: InvoicesPage,
});
