import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { useTrainerSessions } from "../../hooks/useTrainerSessions";
import { formatDateTime } from "../../utils/format";

export const TrainerDashboardScreen = () => {
  const sessionsQuery = useTrainerSessions();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Trainer dashboard</Text>
      <Text style={styles.subtitle}>Today's sessions and client touchpoints.</Text>
      <Card>
        {sessionsQuery.isLoading ? (
          <LoadingState label="Loading sessions" />
        ) : sessionsQuery.data?.length ? (
          sessionsQuery.data.map((session) => (
            <ListItem
              key={session.id}
              title={`Client ${session.clientId}`}
              subtitle={formatDateTime(session.startTime)}
              trailing={session.status}
            />
          ))
        ) : (
          <EmptyState title="No sessions" message="Your schedule is clear for today." />
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
