import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { DashboardPage } from "../pages/dashboard/DashboardPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/",
  component: DashboardPage,
});
