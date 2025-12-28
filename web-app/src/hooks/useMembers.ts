import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { MemberProfile } from "@/types";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => apiClient.get<{ members: MemberProfile[] }>(endpoints.members),
    select: (data) => data.members
  });
};
