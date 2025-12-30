import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { AdminStats } from "@/types";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => apiClient.get<{ stats: AdminStats }>("/reports/admin-stats"),
    select: (data) => data.stats
  });
};
