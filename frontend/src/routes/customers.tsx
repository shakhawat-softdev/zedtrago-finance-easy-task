import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { CustomersPage } from "../pages/customers/CustomersPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/customers",
  component: CustomersPage,
});
