import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TrainerSessionsScreen } from "../screens/trainer/TrainerSessionsScreen";
import { TrainerSessionDetailScreen } from "../screens/trainer/TrainerSessionDetailScreen";

export type TrainerSessionStackParamList = {
  TrainerSessions: undefined;
  TrainerSessionDetail: { sessionId: string };
};

const Stack = createNativeStackNavigator<TrainerSessionStackParamList>();

export const TrainerSessionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrainerSessions" component={TrainerSessionsScreen} options={{ title: "Sessions" }} />
      <Stack.Screen
        name="TrainerSessionDetail"
        component={TrainerSessionDetailScreen}
        options={{ title: "Session details" }}
      />
    </Stack.Navigator>
  );
};
