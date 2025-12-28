import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useToast } from "../../hooks/useToast";
import { apiClient } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";
import type { AuthStackParamList } from "../../navigation/authStack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export const RegisterScreen: React.FC<NativeStackScreenProps<AuthStackParamList, "Register">> = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { login } = useAuth();

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      await apiClient.post(endpoints.register, {
        firstName,
        lastName,
        email,
        password
      });
      await login(email, password);
    } catch (error) {
      toast("Registration failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Join the premium membership experience.</Text>
      <Card>
        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <Button
          label={isSubmitting ? "Creating account..." : "Create account"}
          onPress={handleRegister}
          disabled={isSubmitting}
        />
        <Button label="Back to sign in" variant="secondary" onPress={() => navigation.navigate("Login")} />
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
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 14,
    color: "#6B7280"
  },
  label: {
    marginTop: 12,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 10,
    marginTop: 6
  }
});
