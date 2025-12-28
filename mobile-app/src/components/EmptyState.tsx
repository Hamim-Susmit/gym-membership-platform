import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmptyState: React.FC<{ title: string; message: string }> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827"
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center"
  }
});
