import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { CommissionsPage } from "../pages/commissions/CommissionsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/commissions",
  component: CommissionsPage,
});
