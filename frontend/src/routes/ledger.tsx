import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { LedgerPage } from "../pages/ledger/LedgerPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/ledger",
  component: LedgerPage,
});
