import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { useCart } from "../contexts/CartContext";
import NumberInput from "./NumberInput";

export default function FoodCardInCart({ currentItem, index }) {
  const { itemsInCart, setItemsInCart } = useCart();
  const [quantity, setQuantity] = useState(itemsInCart[index].amount);

  useEffect(() => {
    setQuantity(itemsInCart[index].amount);
    return () => {};
  }, [itemsInCart]);

  function changeValueInCart(value) {
    setQuantity(value);
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: currentItem.imageUrl }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{currentItem.name}</Text>
        <View style={styles.addToCartContainer}>
          <View style={styles.addToCartLabel}>
            <Text style={styles.addToCartText}>Quantity</Text>
          </View>
          <View style={styles.numberInputContainer}>
            {/*<NumericInput
              value={quantity}
              minValue={1}
              totalWidth={60}
              textColor={"white"}
              //type={"up-down"}
              onChange={(value) => changeValueInCart(value)}
            />*/}
            <NumberInput value={quantity} onChangeValue={changeValueInCart} />
          </View>
        </View>
      </View>
      <View style={styles.removeView}>
        <View style={styles.centerInventory}>
          <FontAwesome name="trash-o" size={24} color="black" />
          <Text style={styles.removeText}>Remove</Text>
        </View>
      </View>
    </View>
  );
}

FoodCardInCart.PropTypes = {
  currentItem: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    amount: PropTypes.number,
  }),
};

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
    height: 40,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#450084",
  },
  numberInputContainer: {
    backgroundColor: "#5800A8",
    borderColor: "#5800A8",
    borderWidth: 1,
    borderRadius: 5,
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
  removeView: {
    width: 60,
    height: 90,
    backgroundColor: "#EDEDED",
  },
  centerInventory: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "normal",
  },
});
