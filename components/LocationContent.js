import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationCard from "./LocationCard";

export default function LocationContent() {
  return (
    <View style={styles.fillScreen}>
      <LocationCard />
    </View>
  );
}

const styles = StyleSheet.create({
  fillScreen: {
    width: "100%",
    height: "100%",
  },
});
