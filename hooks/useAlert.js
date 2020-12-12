import React from "react";
import { Alert } from "react-native";

export function useAlert(title, msg) {
  Alert.alert(
    title,
    msg,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
}

export function useErrorAlert(msg) {
  Alert.alert(
    "Error",
    msg,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
}
