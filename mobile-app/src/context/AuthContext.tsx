import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient, setAuthTokens, setRefreshHandler } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { AuthTokens, RoleAssignment, UserProfile } from "../types";

const STORAGE_KEY = "gym.auth.tokens";

type AuthContextValue = {
  user: UserProfile | null;
  roles: RoleAssignment[];
  tokens: AuthTokens | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<AuthTokens | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const persistTokens = async (tokens: AuthTokens | null) => {
  if (!tokens) {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return;
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
};

const loadTokens = async () => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as AuthTokens) : null;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const roles = user?.roles ?? [];

  const refreshSession = useCallback(async () => {
    if (!tokens?.refreshToken) {
      return null;
    }

    try {
      const refreshed = await apiClient.post<AuthTokens>(endpoints.refresh, {
        refreshToken: tokens.refreshToken
      });
      setTokens(refreshed);
      setAuthTokens(refreshed);
      await persistTokens(refreshed);
      return refreshed;
    } catch {
      await persistTokens(null);
      setTokens(null);
      setAuthTokens(null);
      setUser(null);
      return null;
    }
  }, [tokens]);

  useEffect(() => {
    setRefreshHandler(refreshSession);
  }, [refreshSession]);

  const bootstrap = useCallback(async () => {
    setIsLoading(true);
    const storedTokens = await loadTokens();
    if (!storedTokens) {
      setIsLoading(false);
      return;
    }

    setTokens(storedTokens);
    setAuthTokens(storedTokens);

    try {
      const profile = await apiClient.get<{ user: UserProfile }>(endpoints.me);
      setUser(profile.user);
    } catch {
      const refreshed = await refreshSession();
      if (refreshed) {
        const profile = await apiClient.get<{ user: UserProfile }>(endpoints.me);
        setUser(profile.user);
      }
    } finally {
      setIsLoading(false);
    }
  }, [refreshSession]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiClient.post<{ accessToken: string; refreshToken: string; user: UserProfile }>(
      endpoints.login,
      { email, password }
    );
    const newTokens = { accessToken: response.accessToken, refreshToken: response.refreshToken };
    setTokens(newTokens);
    setAuthTokens(newTokens);
    setUser(response.user);
    await persistTokens(newTokens);
  }, []);

  const logout = useCallback(async () => {
    setTokens(null);
    setAuthTokens(null);
    setUser(null);
    await persistTokens(null);
  }, []);

  const value = useMemo(
    () => ({ user, roles, tokens, isLoading, login, logout, refreshSession }),
    [user, roles, tokens, isLoading, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
