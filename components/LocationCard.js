import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LocationCard() {
  const orderId = "test123";
  const orderTime = "mon 12/9/2020";
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order ID: {orderId}</Text>
      </View>
      <Text style={styles.text}>
        <Text>Student Success Center {"\n"} </Text>
        <Text>Order Time: {orderTime}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card1: {
    backgroundColor: "red",
    borderRadius: 2,
    width: "90%",
    padding: 10,
  },
  card: {
    height: 100,
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 3,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    height: 15,
    width: "100%",
    backgroundColor: "#CBB677",
  },
  headerText: {
    fontWeight: "bold",
    fontFamily: "RobotoCondensed",
  },
  text: {
    fontFamily: "RobotoCondensed",
  },
});
