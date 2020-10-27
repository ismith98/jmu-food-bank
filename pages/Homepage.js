import React from "react";
import { StyleSheet, View } from "react-native";
import GeneralStyles from "../styles/GeneralStyles";
import HomepageButton from "../components/HomepageButton";
import WelcomeView from "../components/WelcomeView";

export default function Homepage() {
  return (
    <View style={GeneralStyles.container}>
      <WelcomeView />
      <HomepageButton isDonateButton={false} />
      <HomepageButton isDonateButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({});
