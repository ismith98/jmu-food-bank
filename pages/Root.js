import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Faq from "./Faq";
import Reserve from "./Reserve";
import Homepage from "./Homepage";

export default function Root({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Faq"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return <Ionicons name="ios-home" size={size} color={color} />;
            case "Faq":
              return (
                <Ionicons name="ios-help-circle" size={size} color={color} />
              );
            case "Reserve":
              return <Ionicons name="ios-basket" size={size} color={color} />;
            default:
              return <Ionicons name="basket" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#450084",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Faq" component={Faq} />
      <Tab.Screen name="Reserve" component={Reserve} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
