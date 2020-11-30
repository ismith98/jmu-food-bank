import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
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
        /*<FlatList
          data={itemsInCart}
          keyExtractor={({ index }) => index}
          refreshing={refreshing}
          renderItem={({ item, index }) => (
            <FoodCardInCart
              currentItem={item}
              key={index}
              count={remountCount}
            />
          )}
        />*/
        /*
        <ScrollView>
          {Array(cartTotal)
            .fill(0)
            .map((item, index) => {
              //<FoodCardInCart currentItem={itemsInCart[index]} key={index} />
              console.log(itemsInCart[index]);
              return index < itemsInCart.length ? (
                <FoodCardInCart currentItem={itemsInCart[index]} key={index} />
              ) : null;
            })}
        </ScrollView>*/
        <ScrollView>
          {itemsInCart.map((item, index) => (
            <FoodCardInCart currentItem={item} key={index} index={index} />
          ))}
        </ScrollView>
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
});
