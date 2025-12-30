import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { MemberProfile } from "@/types";

export const useTrainerClients = () => {
  return useQuery({
    queryKey: ["trainerClients"],
    queryFn: () => apiClient.get<{ clients: MemberProfile[] }>(endpoints.trainerClients),
    select: (data) => data.clients
  });
};
