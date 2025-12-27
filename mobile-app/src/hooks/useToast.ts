import { useCallback } from "react";
import { Alert } from "react-native";

export const useToast = () => {
  return useCallback((title: string, message?: string) => {
    Alert.alert(title, message);
  }, []);
};
