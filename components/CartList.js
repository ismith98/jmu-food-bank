import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { useCart } from "../contexts/CartContext";
import ContinueButton from "./ContinueButton";
import FoodCardInCart from "./FoodCardInCart";

export default function CartList() {
  const { cartTotal, itemsInCart } = useCart();
  const [filteredItemsInCart, setFilteredItemsInCart] = useState(itemsInCart);
  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    setFilteredItemsInCart(itemsInCart);
    return () => {};
  }, [itemsInCart]);

  function filterItems(text) {
    setSearchBarText(text);
    let filteredItems = itemsInCart.filter((item) => {
      let name = item.name.toLowerCase();
      return name.includes(text.toLowerCase());
    });
    setFilteredItemsInCart(filteredItems);
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SearchBar
        onChangeText={filterItems}
        value={searchBarText}
        placeholder="Search for food"
        platform="ios"
        lightTheme
        round
      />
      {cartTotal > 0 ? (
        <>
          <ScrollView>
            {filteredItemsInCart.map((item, index) => (
              <FoodCardInCart currentItem={item} key={index} index={index} />
            ))}
          </ScrollView>
          <ContinueButton />
        </>
      ) : (
        <View style={styles.emptyCartView}>
          <View style={styles.bg}>
            <Text style={styles.emptyCartText}>
              No items in your cart {"\n"} Go to the reserve page
            </Text>
          </View>
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
    //height: 100,
    //backgroundColor: "#EDEDED",
  },
  bg: {
    backgroundColor: "#EDEDED",
    padding: 5,
    borderRadius: 5,
  },
  emptyCartText: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
});
