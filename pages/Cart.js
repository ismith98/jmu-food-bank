import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CartList from "../components/CartList";
import FoodBackground from "../components/FoodBackground";
import MyHeader from "../components/MyHeader";

export default function Cart() {
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
