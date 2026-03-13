import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { ReportingPage } from "../pages/reporting/ReportingPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/reporting",
  component: ReportingPage,
});
