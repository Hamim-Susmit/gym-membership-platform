import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { formatName } from "../../utils/format";

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile & Settings</Text>
      <Text style={styles.subtitle}>Manage your account preferences.</Text>
      <Card>
        <Text style={styles.name}>{user ? formatName(user.firstName, user.lastName) : "Member"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.roles}>Roles: {user?.roles.map((role) => role.name).join(", ")}</Text>
      </Card>
      <Card>
        <Button label="Log out" variant="secondary" onPress={() => void logout()} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    fontSize: 14,
    color: "#6B7280"
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827"
  },
  email: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280"
  },
  roles: {
    marginTop: 6,
    fontSize: 13,
    color: "#374151"
  }
});
