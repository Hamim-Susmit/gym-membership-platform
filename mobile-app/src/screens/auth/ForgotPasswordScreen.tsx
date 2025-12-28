import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { AuthStackParamList } from "../../navigation/authStack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export const ForgotPasswordScreen: React.FC<
  NativeStackScreenProps<AuthStackParamList, "ForgotPassword">
> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.subtitle}>This flow is UI-only in the MVP.</Text>
      <Card>
        <Text style={styles.label}>Please contact concierge support to reset your password.</Text>
        <Button label="Back to sign in" onPress={() => navigation.navigate("Login")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    color: "#6B7280"
  },
  label: {
    fontSize: 14,
    color: "#374151"
  }
});
