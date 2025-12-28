import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { MemberProfile } from "@/types";

export const useTrainers = () => {
  return useQuery({
    queryKey: ["trainers"],
    queryFn: () => apiClient.get<{ trainers: MemberProfile[] }>(endpoints.trainers),
    select: (data) => data.trainers
  });
};
