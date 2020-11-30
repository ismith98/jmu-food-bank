import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CartList from "../components/CartList";
import FoodBackground from "../components/FoodBackground";
import MyHeader from "../components/MyHeader";
import { useCart } from "../contexts/CartContext";

export default function Cart({ navigation }) {
  useEffect(() => {
    //Since this is the initial route, immeditatley navigate to the homescreen
    navigation.navigate("Home");
    return () => {};
  }, []);

  const { cartTotal } = useCart();

  useEffect(() => {
    //Add a badge if there are items in the cart
    cartTotal > 0
      ? navigation.setOptions({
          tabBarBadge: cartTotal,
          tabBarBadgeStyle: { backgroundColor: "#450084" },
        })
      : navigation.setOptions({ tabBarBadge: null });
    return () => {};
  }, [cartTotal]);

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"My Cart"} />

      <View style={styles.body}>
        <FoodBackground isDark={false} child={<CartList />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    //The height of the header is 80
    marginTop: 80,
    flex: 1,
  },
});
