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
    <MyHeader title={"My Cart"}>
      {/* children appear beneath the header */}
      <FoodBackground isDark={false}>
        <CartList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
