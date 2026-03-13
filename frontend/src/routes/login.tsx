import { createRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { LoginPage } from "../pages/login/LoginPage";
import { toastError, toastSuccess } from "../utils/notify";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../utils/authStorage";

// Wrapper component so we can call the hook
function LoginRoute() {
  const navigate = useNavigate();
  const { isLoading, login } = useAuth();
  return (
    <LoginPage
      loading={isLoading}
      onSubmit={async (email, password) => {
        try {
          await login({ email, password });
          toastSuccess("Login successful");
          await navigate({ to: "/", replace: true });
        } catch {
          toastError("Invalid credentials");
          throw new Error("Invalid credentials");
        }
      }}
    />
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated || Boolean(getToken())) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginRoute,
});
