import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LocationCard() {
  return (
    <View style={styles.card}>
      <Text>Student Success Center</Text>
      <Text>Harrisonburg, VA 22801</Text>
      <Text>Get Directions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    //height: "10%",
  },
});
