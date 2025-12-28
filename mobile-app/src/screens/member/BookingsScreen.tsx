import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { useBookings } from "../../hooks/useBookings";
import { formatDateTime } from "../../utils/format";

export const BookingsScreen = () => {
  const bookingsQuery = useBookings();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My bookings</Text>
      <Text style={styles.subtitle}>Manage your classes and sessions.</Text>
      <Card>
        {bookingsQuery.isLoading ? (
          <LoadingState label="Loading bookings" />
        ) : bookingsQuery.data?.length ? (
          bookingsQuery.data.map((booking) => (
            <ListItem
              key={booking.id}
              title={booking.class?.name ?? "Class booking"}
              subtitle={formatDateTime(booking.class?.startTime)}
              trailing={booking.status}
            />
          ))
        ) : (
          <EmptyState title="No bookings" message="Reserve a class to see it here." />
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
