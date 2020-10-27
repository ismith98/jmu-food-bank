import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GeneralStyles from "../styles/GeneralStyles";
import donateFoodIcon from "../assets/welcomeScreenDonateFoodIcon.png";
import reserveFoodIcon from "../assets/welcomeScreenReserveFoodIcon.png";

export default function HomepageButton({ isDonateButton }) {
  const navigation = useNavigation();
  function onPress() {
    isDonateButton ? gotoDonatePage() : gotoReservePage();
  }

  function gotoDonatePage() {
    console.log("goto donate page");
  }

  function gotoReservePage() {
    navigation.navigate("Root", { screen: "Reserve" });
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[GeneralStyles.buttonContainer, styles.homepageButton]}
    >
      <View>
        <Image
          style={styles.icon}
          source={isDonateButton ? donateFoodIcon : reserveFoodIcon}
        />

        <Text>{isDonateButton ? "Donate Food" : "Reserve Food"}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
  homepageButton: {
    marginBottom: 10,

    //box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    //for android
    elevation: 10,
  },
});
