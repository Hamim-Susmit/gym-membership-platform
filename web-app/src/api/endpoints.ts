export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com";

export const endpoints = {
  login: "/auth/login",
  refresh: "/auth/refresh",
  me: "/me",
  locations: "/locations",
  classes: "/classes",
  bookings: "/bookings",
  checkIns: "/checkins",
  members: "/members",
  trainers: "/trainers",
  trainerClients: "/trainer/clients",
  trainerSessions: "/trainer/sessions",
  notifications: "/notifications",
  announcements: "/admin/announcements",
  adminStats: "/reports/admin-stats",
  reports: "/reports"
};
