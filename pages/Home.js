import React from "react";
import { StyleSheet, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
import FoodBackground from "../components/general/FoodBackground";
import WelcomeContent from "../components/home/WelcomeContent";

export default function Home() {
  return (
    <View style={GeneralStyles.container}>
      <View style={styles.foodBg}>
        <FoodBackground>
          <WelcomeContent />
        </FoodBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
