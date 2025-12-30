import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning";
};

export const Badge: React.FC<BadgeProps> = ({ label, tone = "neutral" }) => {
  const toneStyle = tone === "neutral" ? styles.neutral : tone === "success" ? styles.success : styles.warning;
  return (
    <View style={[styles.base, toneStyle]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: "flex-start"
  },
  neutral: {
    backgroundColor: "#E5E7EB"
  },
  success: {
    backgroundColor: "#D1FAE5"
  },
  warning: {
    backgroundColor: "#FEF3C7"
  },
  text: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600"
  }
});
