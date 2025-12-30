export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://api.example.com");

export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  refresh: "/auth/refresh",
  me: "/me",
  locations: "/locations",
  classes: "/classes",
  bookings: "/bookings",
  checkIns: "/checkins",
  members: "/members",
  trainers: "/trainers",
  trainerSessions: "/trainer/sessions",
  announcements: "/admin/announcements",
  reports: "/reports",
  notifications: "/notifications",
  trainerClients: "/trainer/clients"
};
