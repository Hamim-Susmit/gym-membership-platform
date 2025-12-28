import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { AdminStats } from "@/types";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => apiClient.get<{ stats: AdminStats }>(endpoints.adminStats),
    select: (data) => data.stats
  });
};
