import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import type { TrainerClient } from "../../types";

export const TrainerClientsScreen = () => {
  const clientsQuery = useQuery({
    queryKey: ["trainerClients"],
    queryFn: () => apiClient.get<{ clients: TrainerClient[] }>(endpoints.trainerClients),
    select: (data) => data.clients
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Client list</Text>
      <Text style={styles.subtitle}>Review client activity and notes.</Text>
      <Card>
        {clientsQuery.isLoading ? (
          <LoadingState label="Loading clients" />
        ) : clientsQuery.data?.length ? (
          clientsQuery.data.map((client) => (
            <ListItem key={client.id} title={`${client.firstName} ${client.lastName}`} subtitle="Active client" />
          ))
        ) : (
          <EmptyState title="No clients yet" message="Your assigned clients will appear here." />
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
