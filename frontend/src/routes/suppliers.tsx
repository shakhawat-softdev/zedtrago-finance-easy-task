import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { SuppliersPage } from "../pages/suppliers/SuppliersPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/suppliers",
  component: SuppliersPage,
});
