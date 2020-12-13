import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OrderCard({ order }) {
  const [hideDetails, setHideDetails] = useState(true);
  const pickupTime = "mon 12/9/2020";
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order ID: {order.orderId}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          <MaterialIcons name="place" size={20} color="black" />
          <Text>
            {"  "}Student Success Center {"\n"}{" "}
          </Text>
          <Ionicons name="md-time" size={20} color="black" />
          <Text>
            {"  "}
            {pickupTime} {"\n"}
          </Text>
          <MaterialCommunityIcons name="food-apple" size={20} color="black" />
          <Text style={styles.itemNames} numberOfLines={1}>
            {"  "}
            {order.itemsInCart.map((item, index) =>
              index !== order.itemsInCart.length - 1
                ? `${item.amount} ${item.name}, `
                : `${item.amount} ${item.name}`
            )}{" "}
            {"\n"}
          </Text>
          {hideDetails ? (
            <Text onPress={() => setHideDetails(false)} style={styles.details}>
              {"       "}more details...{" "}
            </Text>
          ) : (
            <>
              <Text>
                Time Ordered: {order.timeOrdered} {"\n"}
              </Text>
              <Text onPress={() => setHideDetails(true)} style={styles.details}>
                {"       "}less details...{" "}
              </Text>
            </>
          )}
        </Text>
      </View>
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
    //height: 100,
    //flexDirection: "row",
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
    width: "100%",
    backgroundColor: "#CBB677",
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoCondensed",
    color: "black",
  },
  content: {
    padding: 5,
  },
  text: {
    fontFamily: "RobotoCondensed",
    fontSize: 16,
    lineHeight: 28,
  },
  itemNames: {
    textTransform: "capitalize",
  },
  lineSpace: {
    fontSize: 4,
  },
  details: {
    color: "blue",
  },
});
