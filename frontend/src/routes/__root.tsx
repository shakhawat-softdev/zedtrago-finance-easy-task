import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContext } from "./routerContext";

export const Route = createRootRouteWithContext<AuthContext>()({
  component: () => <Outlet />,
});
