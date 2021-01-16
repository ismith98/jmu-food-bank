import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useCart } from "../../contexts/CartContext";
import NumberInput from "../general/NumberInput";

export default function FoodCard({ currentItem }) {
  const [startingAmount, setStartingAmount] = useState(
    currentItem.totalInventory - currentItem.amountReserved
  );
  const [quantity, setQuantity] = useState(0);
  const [availableInventory, setAvailableInventory] = useState(startingAmount);
  const { itemsInCart, setItemsInCart, setCartTotal } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    let startAmount = currentItem.totalInventory - currentItem.amountReserved;
    setStartingAmount(startAmount);
    setAvailableInventory(startAmount);
    return () => {};
  }, [currentItem]);

  useEffect(() => {
    let itemInCart = getThisItemFromCart();
    if (itemInCart) {
      setQuantity(itemInCart.amount);
      setAvailableInventory(startingAmount - itemInCart.amount);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setAvailableInventory(startingAmount);
      setIsInCart(false);
    }
    return () => {};
  }, [itemsInCart]);

  function getThisItemFromCart() {
    if (itemsInCart.length > 0) {
      let itemInCart = itemsInCart.find((item) => item.id === currentItem.id);
      if (itemInCart) {
        setIsInCart(true);
      }
      return itemInCart;
    } else {
      return null;
    }
  }

  function changeValueInCart(value) {
    if (value > startingAmount) {
      return;
    }
    var prevAmountInCart = 0;
    setQuantity((prevAmount) => {
      prevAmountInCart = prevAmount;
      return value;
    });
    setAvailableInventory(startingAmount - value);
    let difference = value - prevAmountInCart;
    if (value === 0) {
      removeItemFromCart(difference);
    } else if (isInCart) {
      replaceAmountInCart(value, difference);
    } else {
      addItemToCartContext(value, difference);
    }
  }

  function removeItemFromCart(difference) {
    setIsInCart(false);
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.id !== currentItem.id)
    );
    setCartTotal((prevTotal) => prevTotal + difference);
  }

  function replaceAmountInCart(value, difference) {
    setItemsInCart((prevItems) =>
      prevItems.map((item) => {
        if (item.id === currentItem.id) {
          item.amount = value;
        }
        return item;
      })
    );
    setCartTotal((prevTotal) => prevTotal + difference);
  }

  function addItemToCartContext(value, difference) {
    setIsInCart(true);
    setItemsInCart((prevItems) => [
      ...prevItems,
      {
        name: currentItem.name,
        amount: value,
        startingAmount: startingAmount,
        imageUrl: currentItem.imageUrl,
        id: currentItem.id,
      },
    ]);
    setCartTotal((prevTotal) => prevTotal + difference);
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: currentItem.imageUrl }} style={styles.image} />
      <View style={styles.inventory}>
        <View style={styles.centerInventory}>
          <Text style={styles.number}>{availableInventory}</Text>
          <Text style={styles.inStock}>In Stock</Text>
        </View>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{currentItem.name}</Text>
        <View style={styles.addToCartContainer}>
          <View style={styles.addToCartLabel}>
            <Text style={styles.addToCartText}>Amount in Cart</Text>
          </View>
          <View style={styles.numberInputContainer}>
            <NumberInput
              value={quantity}
              onChangeValue={(value) => changeValueInCart(value)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: 90,
    height: "100%",
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
    height: 45,
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
  inventory: {
    width: 60,
    height: "100%",
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
