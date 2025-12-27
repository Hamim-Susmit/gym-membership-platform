export type RoleName = "MEMBER" | "TRAINER" | "LOCATION_ADMIN" | "SUPER_ADMIN";

export type RoleAssignment = {
  name: RoleName;
  locationId?: string | null;
};

export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: RoleAssignment[];
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  timezone: string;
  amenities: string[];
  openingHours: Record<string, string>;
  isActive: boolean;
};

export type ClassItem = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  trainerId: string;
  room: string;
};

export type Booking = {
  id: string;
  classId: string;
  status: "BOOKED" | "CANCELLED" | "ATTENDED" | "NO_SHOW";
  class?: ClassItem;
};

export type CheckIn = {
  id: string;
  locationId: string;
  timestamp: string;
};

export type TrainerSession = {
  id: string;
  clientId: string;
  startTime: string;
  endTime: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  notes?: string | null;
};

export type MemberProfile = {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

export type AdminStats = {
  activeMembers: number;
  weeklyCheckIns: number;
  classOccupancy: number;
  trainerUtilization: number;
};
