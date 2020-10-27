import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import foodBgImage from "../assets/background.png";
import WelcomeContent from "../components/WelcomeContent";
import GeneralStyles from "../styles/GeneralStyles";

export default function WelcomeView() {
  return (
    <View>
      <ImageBackground source={foodBgImage} style={GeneralStyles.container}>
        <WelcomeContent />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
