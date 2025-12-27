import { API_BASE_URL } from "./endpoints";
import type { AuthTokens } from "@/types";

let tokens: AuthTokens | null = null;
let refreshHandler: (() => Promise<AuthTokens | null>) | null = null;

export const setAuthTokens = (authTokens: AuthTokens | null) => {
  tokens = authTokens;
};

export const setRefreshHandler = (handler: () => Promise<AuthTokens | null>) => {
  refreshHandler = handler;
};

const buildHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (tokens?.accessToken) {
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return headers;
};

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(),
      ...(options?.headers ?? {})
    }
  });

  if (response.status === 401 && refreshHandler) {
    const refreshed = await refreshHandler();
    if (refreshed?.accessToken) {
      const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          ...buildHeaders(),
          ...(options?.headers ?? {})
        }
      });
      if (!retryResponse.ok) {
        throw new Error("Request failed after refresh");
      }
      return retryResponse.json() as Promise<T>;
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body ?? {})
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body ?? {})
    })
};
