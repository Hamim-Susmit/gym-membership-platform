import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { useBookings } from "../../hooks/useBookings";
import { useCheckIns } from "../../hooks/useCheckIns";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { formatDateTime } from "../../utils/format";

export const MemberHomeScreen = () => {
  const bookingsQuery = useBookings();
  const checkInsQuery = useCheckIns();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Today at a glance</Text>
      <Text style={styles.subtitle}>Your premium experience, curated.</Text>

      <Card>
        <Text style={styles.cardTitle}>Next class</Text>
        {bookingsQuery.isLoading ? (
          <LoadingState label="Fetching bookings" />
        ) : bookingsQuery.data?.length ? (
          <View>
            <Text style={styles.cardMain}>{bookingsQuery.data[0].class?.name ?? "Booked class"}</Text>
            <Text style={styles.cardSub}>{formatDateTime(bookingsQuery.data[0].class?.startTime)}</Text>
            <Badge label={bookingsQuery.data[0].status} />
          </View>
        ) : (
          <EmptyState title="No upcoming classes" message="Browse the schedule to reserve a spot." />
        )}
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Last check-in</Text>
        {checkInsQuery.isLoading ? (
          <LoadingState label="Loading check-ins" />
        ) : checkInsQuery.data?.length ? (
          <Text style={styles.cardMain}>{formatDateTime(checkInsQuery.data[0].timestamp)}</Text>
        ) : (
          <EmptyState title="No visits yet" message="Check in at any location to start tracking visits." />
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
    marginBottom: 20,
    fontSize: 14,
    color: "#6B7280"
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8
  },
  cardMain: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827"
  },
  cardSub: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8
  }
});
