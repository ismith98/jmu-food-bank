import React from "react";
import { StyleSheet, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
//import HomepageButton from "../components/HomepageButton";
import FoodBackground from "../components/FoodBackground";
import WelcomeContent from "../components/WelcomeContent";

export default function Homepage() {
  return (
    <View style={GeneralStyles.container}>
      <FoodBackground child={<WelcomeContent />} />
      {/*
      <HomepageButton isDonateButton={false} />
      <HomepageButton isDonateButton={true} />
      */}
    </View>
  );
}

const styles = StyleSheet.create({});
