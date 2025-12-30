import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { TrainerSession } from "@/types";

export const useTrainerSessions = () => {
  return useQuery({
    queryKey: ["trainerSessions"],
    queryFn: () => apiClient.get<{ sessions: TrainerSession[] }>(endpoints.trainerSessions),
    select: (data) => data.sessions
  });
};
