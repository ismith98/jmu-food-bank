import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralStyles from "../styles/GeneralStyles";
import PickLocation from "./PickLocation";
import FoodList from "../components/FoodList";
import FoodBackground from "../components/FoodBackground";

const Stack = createStackNavigator();
// heigh of header is 24
export default function Reserve({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#450084" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Food List"
        component={FoodList}
        options={{ title: "Reserve Food" }}
      />
      <Stack.Screen
        name="Location"
        component={PickLocation}
        options={{ title: "Choose a Location" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
