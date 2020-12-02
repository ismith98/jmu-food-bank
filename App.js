import { StatusBar } from "expo-status-bar";
import React from "react";
import GeneralStyles from "./styles/GeneralStyles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Faq from "./pages/Faq";
import Reserve from "./pages/Reserve";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { CartProvider, useCart } from "./contexts/CartContext";
import Orders from "./pages/Orders";

const customFonts = {
  RobotoCondensed: require("./fonts/RobotoCondensed-Regular.ttf"),
  Roboto2: require("./fonts/Roboto-Regular.ttf"),
  TurretRoad: require("./fonts/TurretRoad-Regular.ttf"),
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  if (isLoaded) {
    return (
      <CartProvider>
        <NavigationContainer style={GeneralStyles.container}>
          <Tab.Navigator
            initialRouteName="Cart"
            //If you go straight to the homescreen,
            //the badges for the cart won't show until you click on the cart page
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                  case "Orders":
                    return (
                      <MaterialIcons name="receipt" size={size} color={color} />
                    );
                  case "Home":
                    return (
                      <Ionicons name="ios-home" size={size} color={color} />
                    );
                  case "Cart":
                    return (
                      <Ionicons name="ios-cart" size={size} color={color} />
                    );
                  case "Reserve":
                    return (
                      <Ionicons name="ios-basket" size={size} color={color} />
                    );
                  case "FAQ":
                    return (
                      <Ionicons
                        name="ios-help-circle"
                        size={size}
                        color={color}
                      />
                    );
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
            <Tab.Screen name="FAQ" component={Faq} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Home" component={Homepage} />
            <Tab.Screen name="Reserve" component={Reserve} />
            <Tab.Screen name="Cart" component={Cart} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </CartProvider>
    );
  } else {
    return <AppLoading />;
  }
}

//<StatusBar style="auto" />

/*
              options={() => {
                const { cartTotal } = useCart();
                return cartTotal > 0
                  ? {
                      tabBarBadge: cartTotal,
                      //activeTintColor: "#450084",
                      tabBarBadgeStyle: { backgroundColor: "#450084" },
                    }
                  : null;
              }}
            */
