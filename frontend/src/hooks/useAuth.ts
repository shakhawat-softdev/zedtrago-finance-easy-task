import { useMemo, useState } from "react";
import { useGetMeQuery, useLoginMutation } from "../services/api";
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../utils/authStorage";
import type { AuthTokenPayload, AuthUser, LoginPayload } from "../utils/types";

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<AuthUser | null>(() =>
    getStoredUser<AuthUser>(),
  );
  const [loginMutation, loginState] = useLoginMutation();

  const { data: me, isFetching: meLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const resolvedUser = useMemo(() => {
    if (user) return user;
    if (!me) return null;
    return {
      id: me.sub,
      email: me.email,
      role: me.role,
      fullName: "Finance User",
    } as AuthUser;
  }, [me, user]);

  async function login(payload: LoginPayload) {
    const response = await loginMutation(payload).unwrap();
    setToken(response.accessToken);
    setTokenState(response.accessToken);
    setStoredUser(response.user);
    setUser(response.user);
    return response;
  }

  function logout() {
    clearAuthStorage();
    setTokenState(null);
    setUser(null);
  }

  return {
    token,
    user: resolvedUser,
    me: me as AuthTokenPayload | undefined,
    isAuthenticated: Boolean(token),
    isLoading: loginState.isLoading || meLoading,
    login,
    logout,
    loginError: loginState.error,
  };
}
