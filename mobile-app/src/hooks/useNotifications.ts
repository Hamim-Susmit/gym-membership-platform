import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { NotificationItem } from "../types";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiClient.get<{ notifications: NotificationItem[] }>(endpoints.notifications),
    select: (data) => data.notifications
  });
};
