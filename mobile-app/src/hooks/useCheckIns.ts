import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { CheckIn } from "../types";

export const useCheckIns = () => {
  return useQuery({
    queryKey: ["checkins"],
    queryFn: () => apiClient.get<{ checkIns: CheckIn[] }>(endpoints.checkIns),
    select: (data) => data.checkIns
  });
};
