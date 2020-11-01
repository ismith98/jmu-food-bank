import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LocationCard() {
  return (
    <View style={styles.card1}>
      <Text>Student Success Center</Text>
      <Text>Harrisonburg, VA 22801</Text>
      <Text>Get Directions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card1: {
    backgroundColor: "red",
    width: "90%",
    padding: 10,
  },
});
