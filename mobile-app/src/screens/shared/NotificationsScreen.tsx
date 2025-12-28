import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { useNotifications } from "../../hooks/useNotifications";
import { formatDateTime } from "../../utils/format";

export const NotificationsScreen = () => {
  const notificationsQuery = useNotifications();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Stay on top of reminders and updates.</Text>
      <Card>
        {notificationsQuery.isLoading ? (
          <LoadingState label="Loading notifications" />
        ) : notificationsQuery.data?.length ? (
          notificationsQuery.data.map((notification) => (
            <ListItem
              key={notification.id}
              title={notification.title}
              subtitle={notification.body}
              trailing={formatDateTime(notification.createdAt)}
            />
          ))
        ) : (
          <EmptyState title="No notifications" message="You're all caught up." />
        )}
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
  }
});
