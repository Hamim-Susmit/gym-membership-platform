import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Location } from "@/types";

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => apiClient.get<{ locations: Location[] }>(endpoints.locations),
    select: (data) => data.locations
  });
};
