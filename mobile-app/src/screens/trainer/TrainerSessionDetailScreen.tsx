import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useToast } from "../../hooks/useToast";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { TrainerSessionStackParamList } from "../../navigation/trainerStack";

export const TrainerSessionDetailScreen: React.FC<
  NativeStackScreenProps<TrainerSessionStackParamList, "TrainerSessionDetail">
> = ({ route }) => {
  const [note, setNote] = useState("");
  const toast = useToast();

  const handleSave = () => {
    toast("Session note saved", "Wire this to /trainer/sessions when API is ready.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session {route.params.sessionId}</Text>
      <Text style={styles.subtitle}>Capture coaching notes and follow-ups.</Text>
      <Card>
        <Text style={styles.label}>Session notes</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Add outcomes, intensity, and client feedback."
          multiline
        />
        <Button label="Save note" onPress={handleSave} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB"
  },
  title: {
    fontSize: 22,
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
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 12
  }
});
