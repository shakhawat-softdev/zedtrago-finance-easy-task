import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { IntegrationsPage } from "../pages/integrations/IntegrationsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/integrations",
  component: IntegrationsPage,
});
