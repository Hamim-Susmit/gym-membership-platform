import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeGenerator } from "expo-barcode-generator";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

export const MembershipCardScreen = () => {
  const { user } = useAuth();
  const memberId = user?.id ?? "unknown";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Card</Text>
      <Text style={styles.subtitle}>Scan this QR at any location for premium access.</Text>
      <Card style={styles.card}>
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <BarCodeGenerator
          value={memberId}
          style={styles.qr}
          options={{ background: "#ffffff", foreground: "#111827" }}
        />
        <Text style={styles.memberId}>ID: {memberId}</Text>
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
    color: "#111827"
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 14,
    color: "#6B7280"
  },
  card: {
    alignItems: "center"
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12
  },
  qr: {
    width: 200,
    height: 200
  },
  memberId: {
    marginTop: 12,
    fontSize: 13,
    color: "#6B7280"
  }
});
