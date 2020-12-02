import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import darkBackground from "../assets/background.png";
import lightBackground from "../assets/lightBackground.png";
import GeneralStyles from "../styles/GeneralStyles";

export default function FoodBackground({
  isDark = true,
  fullScreen = true,
  children,
}) {
  return (
    <ImageBackground
      source={isDark ? darkBackground : lightBackground}
      style={fullScreen ? GeneralStyles.container : {}}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fillScreen: {
    width: "100%",
    height: "100%",
  },
});
