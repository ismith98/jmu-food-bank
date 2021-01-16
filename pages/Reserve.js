import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FoodList from "../components/FoodList";
import FoodBackground from "../components/general/FoodBackground";
import MyHeader from "../components/general/MyHeader";

export default function Reserve({ navigation }) {
  return (
    <MyHeader title={"Reserve Food"}>
      {/* children appear beneath the header */}
      <FoodBackground isDark={false}>
        <FoodList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
