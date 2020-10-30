import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import darkBackground from "../assets/background.png";
import lightBackground from "../assets/lightBackground.png";
import GeneralStyles from "../styles/GeneralStyles";

export default function FoodBackground({ child, isDark = true }) {
  return (
    <ImageBackground
      source={isDark ? darkBackground : lightBackground}
      style={GeneralStyles.container}
    >
      {child}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
