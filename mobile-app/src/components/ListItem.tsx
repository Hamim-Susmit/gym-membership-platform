import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ListItemProps = {
  title: string;
  subtitle?: string;
  trailing?: string;
  onPress?: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({ title, subtitle, trailing, onPress }) => {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pressed: {
    opacity: 0.6
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827"
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4
  },
  trailing: {
    fontSize: 13,
    color: "#374151"
  }
});
