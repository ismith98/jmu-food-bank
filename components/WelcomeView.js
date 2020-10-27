import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import foodBgImage from "../assets/background.png";
import WelcomeContent from "../components/WelcomeContent";
import GeneralStyles from "../styles/GeneralStyles";

export default function WelcomeView() {
  return (
    <View style={styles.welcomeContainer}>
      <ImageBackground source={foodBgImage} style={GeneralStyles.foodBg}>
        <WelcomeContent />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    height: 260,
    width: "100%",
    marginBottom: 15,

    //box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //for android
    elevation: 5,
  },
});
