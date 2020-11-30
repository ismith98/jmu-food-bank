import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useCart } from "../contexts/CartContext";
import FoodCardInCart from "./FoodCardInCart";

export default function CartList() {
  const { cartTotal, itemsInCart } = useCart();
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    /*console.log(cartTotal);
    console.log(cartArray);
    let arr = cartArray.map((item, index) => index);
    console.log(arr, "arr");
    setCartArray(Array(cartTotal).fill(0));*/
    return () => {};
  }, [cartTotal]);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SearchBar
        //onChangeText={filterItems}
        //value={searchBarText}
        placeholder="Search for food"
        platform="ios"
        lightTheme
        round
      />
      {cartTotal > 0 ? (
        <>
          <ScrollView>
            {itemsInCart.map((item, index) => (
              <FoodCardInCart currentItem={item} key={index} index={index} />
            ))}
          </ScrollView>
          <TouchableHighlight onPress={() => console.log("press")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableHighlight>
        </>
      ) : (
        <View style={styles.emptyCartView}>
          <Text style={styles.emptyCartText}>
            No Items are currently in your cart. {"\n"} Add some from the
            reserve page.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCartView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyCartText: {
    fontFamily: "Roboto",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#CBB677",
    height: 40,
    //flex: 1,
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
  },
});
