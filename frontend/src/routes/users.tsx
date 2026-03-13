import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./_app";
import { UsersPage } from "../pages/users/UsersPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/users",
  component: UsersPage,
});
