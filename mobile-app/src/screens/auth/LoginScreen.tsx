import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/useToast";
import type { AuthStackParamList } from "../../navigation/authStack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export const LoginScreen: React.FC<NativeStackScreenProps<AuthStackParamList, "Login">> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      toast("Login failed", error instanceof Error ? error.message : "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to access your premium gym experience.</Text>
      <Card>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />
        <Button label={isSubmitting ? "Signing in..." : "Sign In"} onPress={handleLogin} disabled={isSubmitting} />
        <Button
          label="Forgot password"
          variant="secondary"
          onPress={() => navigation.navigate("ForgotPassword")}
        />
      </Card>
      <Button label="Create an account" variant="secondary" onPress={() => navigation.navigate("Register")} />
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
