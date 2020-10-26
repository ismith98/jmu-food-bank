import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import GeneralStyles from "./styles/GeneralStyles";
import Homepage from "./pages/Homepage";

export default function App() {
  return (
    <SafeAreaView style={GeneralStyles.container}>
      <Homepage />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
