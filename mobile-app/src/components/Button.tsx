import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ label, onPress, variant = "primary", disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, variant === "secondary" ? styles.secondary : styles.primary, disabled && styles.disabled]}
    >
      <Text style={[styles.label, variant === "secondary" ? styles.secondaryLabel : styles.primaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6
  },
  primary: {
    backgroundColor: "#111827"
  },
  secondary: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  disabled: {
    opacity: 0.6
  },
  label: {
    fontSize: 16,
    fontWeight: "600"
  },
  primaryLabel: {
    color: "#FFFFFF"
  },
  secondaryLabel: {
    color: "#111827"
  }
});
