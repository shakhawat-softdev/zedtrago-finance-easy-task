import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { CurrencyPage } from "../pages/currency/CurrencyPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/currency",
  component: CurrencyPage,
});
