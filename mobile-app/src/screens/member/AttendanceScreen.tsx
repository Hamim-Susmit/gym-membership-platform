import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { useCheckIns } from "../../hooks/useCheckIns";
import { formatDateTime } from "../../utils/format";

export const AttendanceScreen = () => {
  const checkInsQuery = useCheckIns();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Attendance history</Text>
      <Text style={styles.subtitle}>Track your visits and streaks.</Text>
      <Card>
        {checkInsQuery.isLoading ? (
          <LoadingState label="Loading attendance" />
        ) : checkInsQuery.data?.length ? (
          checkInsQuery.data.map((checkIn) => (
            <ListItem
              key={checkIn.id}
              title={checkIn.locationId}
              subtitle={formatDateTime(checkIn.timestamp)}
            />
          ))
        ) : (
          <EmptyState title="No attendance yet" message="Check in to see your visit history." />
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
