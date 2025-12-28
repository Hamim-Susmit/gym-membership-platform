import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { ClassItem } from "../types";

export const useClasses = (locationId?: string, date?: string) => {
  return useQuery({
    queryKey: ["classes", locationId, date],
    queryFn: () =>
      apiClient.get<{ classes: ClassItem[] }>(
        `${endpoints.classes}?locationId=${locationId ?? ""}&date=${date ?? ""}`
      ),
    select: (data) => data.classes
  });
};
