"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient, setAuthTokens, setRefreshHandler } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { AuthTokens, RoleAssignment, UserProfile } from "@/types";

const STORAGE_KEY = "gym.auth.tokens";

type AuthContextValue = {
  user: UserProfile | null;
  roles: RoleAssignment[];
  tokens: AuthTokens | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<AuthTokens | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const persistTokens = (authTokens: AuthTokens | null) => {
  if (typeof window === "undefined") return;
  if (!authTokens) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authTokens));
};

const loadTokens = () => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
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
      persistTokens(refreshed);
      return refreshed;
    } catch {
      persistTokens(null);
      setTokens(null);
      setAuthTokens(null);
      setUser(null);
      return null;
    }
  }, [tokens]);

  useEffect(() => {
    setRefreshHandler(refreshSession);
  }, [refreshSession]);

  useEffect(() => {
    const bootstrap = async () => {
      setIsLoading(true);
      const storedTokens = loadTokens();
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
    };

    void bootstrap();
  }, [refreshSession]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiClient.post<{ accessToken: string; refreshToken: string; user: UserProfile }>(
      endpoints.login,
      { email, password }
    );
    const newTokens = { accessToken: response.accessToken, refreshToken: response.refreshToken };
    setTokens(newTokens);
    setAuthTokens(newTokens);
    setUser(response.user);
    persistTokens(newTokens);
  }, []);

  const logout = useCallback(() => {
    setTokens(null);
    setAuthTokens(null);
    setUser(null);
    persistTokens(null);
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
