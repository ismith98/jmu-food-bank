import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
import foodBgImage from "../assets/background.png";
import HomepageButton from "../components/HomepageButton";
import WelcomeView from "../components/WelcomeView";

export default function Homepage() {
  return (
    <>
      <View style={styles.welcomeContainer}>
        <ImageBackground source={foodBgImage} style={GeneralStyles.foodBg}>
          <WelcomeView />
        </ImageBackground>
      </View>
      <HomepageButton isDonateButton={false} />
      <HomepageButton isDonateButton={true} />
    </>
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
