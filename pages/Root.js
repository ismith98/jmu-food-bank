import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//import Icon from "react-native-ionicons";
import Faq from "./Faq";
import Reserve from "./Reserve";

export default function Root({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          console.log(route.name);
          if (route.name === "Faq") {
            return (
              <Ionicons name="ios-help-circle" size={size} color={color} />
            );
          } else if (route.name === "Reserve") {
            return <Ionicons name="ios-basket" size={size} color={color} />;
          } else {
            return <Ionicons name="basket" size={size} color={color} />;
          }
          /*
          let parsedRoute = JSON.parse(route);
          console.log(parsedRoute);
          switch (parsedRoute.name) {
            case "Faq":
              return <Ionicons name="help-circle" size={size} color={color} />;
            case "Reserve":
              return <Ionicons name="basket" size={size} color={color} />;
            default:
              return <Ionicons name="basket" size={size} color={color} />;
          }*/
        },
      })}
      tabBarOptions={{
        activeTintColor: "#450084",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Faq" component={Faq} />
      <Tab.Screen name="Reserve" component={Reserve} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
