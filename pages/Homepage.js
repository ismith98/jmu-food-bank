import React from "react";
import { StyleSheet, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
import FoodBackground from "../components/FoodBackground";
import WelcomeContent from "../components/WelcomeContent";

export default function Homepage() {
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
