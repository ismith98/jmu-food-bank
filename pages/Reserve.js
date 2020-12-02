import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FoodList from "../components/FoodList";
import FoodBackground from "../components/FoodBackground";
import MyHeader from "../components/MyHeader";

export default function Reserve({ navigation }) {
  return (
    <MyHeader title={"Reserve Food"}>
      <FoodBackground isDark={false}>
        <FoodList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
