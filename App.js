import { StatusBar } from "expo-status-bar";
import React from "react";
import GeneralStyles from "./styles/GeneralStyles";
import Homepage from "./pages/Homepage";
import Root from "./pages/Root";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={GeneralStyles.container}>
      <Stack.Navigator initialRoute="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//<StatusBar style="auto" />
