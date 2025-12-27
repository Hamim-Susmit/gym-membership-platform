import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import type { Location } from "../../types";

export const LocationsScreen = () => {
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: () => apiClient.get<{ locations: Location[] }>(endpoints.locations),
    select: (data) => data.locations
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Locations</Text>
      <Text style={styles.subtitle}>Find hours, amenities, and peak times.</Text>
      <Card>
        {locationsQuery.isLoading ? (
          <LoadingState label="Loading locations" />
        ) : locationsQuery.data?.length ? (
          locationsQuery.data.map((location) => (
            <ListItem
              key={location.id}
              title={location.name}
              subtitle={`${location.address}, ${location.city}`}
              trailing={location.isActive ? "Open" : "Closed"}
            />
          ))
        ) : (
          <EmptyState title="No locations" message="Locations will appear once available." />
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
