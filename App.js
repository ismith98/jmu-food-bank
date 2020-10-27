import { StatusBar } from "expo-status-bar";
import React from "react";
import GeneralStyles from "./styles/GeneralStyles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Faq from "./pages/Faq";
import Reserve from "./pages/Reserve";
import Homepage from "./pages/Homepage";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={GeneralStyles.container}>
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
    </NavigationContainer>
  );
}

//<StatusBar style="auto" />
