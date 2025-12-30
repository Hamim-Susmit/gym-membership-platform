import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { endpoints } from "../api/endpoints";
import type { Booking } from "@/types";

export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => apiClient.get<{ bookings: Booking[] }>(endpoints.bookings),
    select: (data) => data.bookings
  });
};
