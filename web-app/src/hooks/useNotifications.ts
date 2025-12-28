import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  readAt?: string | null;
  createdAt: string;
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiClient.get<{ notifications: NotificationItem[] }>(endpoints.notifications),
    select: (data) => data.notifications
  });
};
