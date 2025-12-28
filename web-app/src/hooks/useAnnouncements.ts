import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";

export type AnnouncementItem = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: () => apiClient.get<{ announcements: AnnouncementItem[] }>(endpoints.announcements),
    select: (data) => data.announcements
  });
};
