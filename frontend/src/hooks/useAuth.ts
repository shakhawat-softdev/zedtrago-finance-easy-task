import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useGetMeQuery, useLoginMutation } from "../services/api";
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../utils/authStorage";
import type { AuthTokenPayload, AuthUser, LoginPayload } from "../utils/types";

type AuthSnapshot = {
  token: string | null;
  user: AuthUser | null;
};

let authSnapshot: AuthSnapshot = {
  token: getToken(),
  user: getStoredUser<AuthUser>(),
};

const authListeners = new Set<() => void>();

function subscribeAuth(listener: () => void) {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

function setAuthSnapshot(next: AuthSnapshot) {
  authSnapshot = next;
  authListeners.forEach((listener) => listener());
}

export function useAuth() {
  const token = useSyncExternalStore(
    subscribeAuth,
    () => authSnapshot.token,
    () => authSnapshot.token,
  );
  const user = useSyncExternalStore(
    subscribeAuth,
    () => authSnapshot.user,
    () => authSnapshot.user,
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

  useEffect(() => {
    if (!token || user || !me) return;

    const nextUser: AuthUser = {
      id: me.sub,
      email: me.email,
      role: me.role,
      fullName: "Finance User",
    };

    setStoredUser(nextUser);
    setAuthSnapshot({ token, user: nextUser });
  }, [me, token, user]);

  async function login(payload: LoginPayload) {
    const response = await loginMutation(payload).unwrap();
    setToken(response.accessToken);
    setStoredUser(response.user);
    setAuthSnapshot({ token: response.accessToken, user: response.user });
    return response;
  }

  function logout() {
    clearAuthStorage();
    setAuthSnapshot({ token: null, user: null });
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
