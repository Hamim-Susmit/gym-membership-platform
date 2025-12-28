import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const LoadingState: React.FC<{ label?: string }> = ({ label = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#111827" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: "center"
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280"
  }
});
