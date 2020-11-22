import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import NumericInput from "react-native-numeric-input";

//console.log(foodItems[0].imageUrl);
//const path = require("https://i.imgur.com/c0JWUxd.jpg");
export default function FoodCard({ foodItem }) {
  const startingInventoryAmount =
    foodItem.totalInventory - foodItem.amountReserved;
  const [amountInCart, setAmountInCart] = useState(0);
  const [availableInventory, setAvailableInventory] = useState(
    startingInventoryAmount
  );

  function addItemToCart(value) {
    setAmountInCart(value);
    setAvailableInventory(startingInventoryAmount - value);
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: foodItem.imageUrl }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{foodItem.name}</Text>
        <View style={styles.addToCartContainer}>
          <View style={styles.addToCartLabel}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </View>
          <View style={{ backgroundColor: "#5800A8", borderWidth: 0 }}>
            <NumericInput
              value={amountInCart}
              minValue={0}
              totalWidth={60}
              textColor={"white"}
              //type={"up-down"}
              onChange={(value) => addItemToCart(value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.inventory}>
        <View style={styles.centerInventory}>
          <Text style={styles.number}>{availableInventory}</Text>
          <Text style={styles.inStock}>In Stock</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 90,
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
  image: {
    width: 90,
    height: 90,
  },
  itemInfo: {
    flex: 1,
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "RobotoCondensed",
    textTransform: "capitalize",
    fontWeight: "normal",
  },
  addToCartContainer: {
    width: "100%",
    //height: 40,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#450084",
  },
  addToCartLabel: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  addToCartText: {
    color: "white",
  },
  dropdown: {
    width: 40,
    backgroundColor: "#5800A8",
    //color: "white",
    borderWidth: 0,
  },
  inventory: {
    width: 60,
    height: 90,
    backgroundColor: "#EDEDED",
  },
  centerInventory: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "normal",
  },
  inStock: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "normal",
  },
});
