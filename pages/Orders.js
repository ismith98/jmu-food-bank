import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import FoodBackground from "../components/FoodBackground";
import OrdersList from "../components/OrdersList";

export default function Orders() {
  return (
    <MyHeader title="My Orders">
      {/* children appear beneath the header */}
      <FoodBackground isDark={false}>
        <OrdersList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
