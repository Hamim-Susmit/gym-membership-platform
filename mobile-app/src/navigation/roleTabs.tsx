import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import { MemberHomeScreen } from "../screens/member/MemberHomeScreen";
import { MembershipCardScreen } from "../screens/member/MembershipCardScreen";
import { ClassBrowseScreen } from "../screens/member/ClassBrowseScreen";
import { BookingsScreen } from "../screens/member/BookingsScreen";
import { LocationsScreen } from "../screens/member/LocationsScreen";
import { AttendanceScreen } from "../screens/member/AttendanceScreen";
import { TrainerDashboardScreen } from "../screens/trainer/TrainerDashboardScreen";
import { TrainerClientsScreen } from "../screens/trainer/TrainerClientsScreen";
import { AvailabilityScreen } from "../screens/trainer/AvailabilityScreen";
import { ProfileScreen } from "../screens/shared/ProfileScreen";
import { NotificationsScreen } from "../screens/shared/NotificationsScreen";
import { TrainerSessionStackNavigator } from "./trainerStack";

export type AppTabParamList = {
  MemberHome: undefined;
  MembershipCard: undefined;
  ClassBrowse: undefined;
  Bookings: undefined;
  Locations: undefined;
  Attendance: undefined;
  TrainerHome: undefined;
  TrainerClients: undefined;
  TrainerSessions: undefined;
  TrainerAvailability: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const hasTrainerRole = (roles: string[]) => roles.includes("TRAINER");

export const AppTabs = () => {
  const { roles } = useAuth();
  const roleNames = roles.map((role) => role.name);
  const isTrainer = hasTrainerRole(roleNames);

  return (
    <Tab.Navigator>
      {isTrainer ? (
        <>
          <Tab.Screen name="TrainerHome" component={TrainerDashboardScreen} options={{ title: "Dashboard" }} />
          <Tab.Screen name="TrainerClients" component={TrainerClientsScreen} options={{ title: "Clients" }} />
          <Tab.Screen name="TrainerSessions" component={TrainerSessionStackNavigator} options={{ headerShown: false, title: "Sessions" }} />
          <Tab.Screen name="TrainerAvailability" component={AvailabilityScreen} options={{ title: "Availability" }} />
        </>
      ) : (
        <>
          <Tab.Screen name="MemberHome" component={MemberHomeScreen} options={{ title: "Home" }} />
          <Tab.Screen name="MembershipCard" component={MembershipCardScreen} options={{ title: "Card" }} />
          <Tab.Screen name="ClassBrowse" component={ClassBrowseScreen} options={{ title: "Classes" }} />
          <Tab.Screen name="Bookings" component={BookingsScreen} options={{ title: "Bookings" }} />
          <Tab.Screen name="Locations" component={LocationsScreen} options={{ title: "Locations" }} />
          <Tab.Screen name="Attendance" component={AttendanceScreen} options={{ title: "Attendance" }} />
        </>
      )}
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: "Alerts" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
};
