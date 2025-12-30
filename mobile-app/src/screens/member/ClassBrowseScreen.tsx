import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { Card } from "../../components/Card";
import { ListItem } from "../../components/ListItem";
import { LoadingState } from "../../components/LoadingState";
import { EmptyState } from "../../components/EmptyState";
import { useClasses } from "../../hooks/useClasses";
import { formatDateTime } from "../../utils/format";

export const ClassBrowseScreen = () => {
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState("");
  const classesQuery = useClasses(locationId, date);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Class schedule</Text>
      <Text style={styles.subtitle}>Browse by location or date.</Text>
      <Card>
        <Text style={styles.label}>Location ID</Text>
        <TextInput
          style={styles.input}
          value={locationId}
          onChangeText={setLocationId}
          placeholder="Optional"
        />
        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Optional" />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Upcoming classes</Text>
        {classesQuery.isLoading ? (
          <LoadingState label="Loading classes" />
        ) : classesQuery.data?.length ? (
          classesQuery.data.map((classItem) => (
            <ListItem
              key={classItem.id}
              title={classItem.name}
              subtitle={formatDateTime(classItem.startTime)}
              trailing={classItem.room}
            />
          ))
        ) : (
          <EmptyState title="No classes" message="Try a different date or location." />
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
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 6
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8
  }
});
