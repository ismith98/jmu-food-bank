import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GeneralStyles from "../styles/GeneralStyles";
import donateFoodIcon from "../assets/welcomeScreenDonateFoodIcon.png";
import reserveFoodIcon from "../assets/welcomeScreenReserveFoodIcon.png";
import { Ionicons } from "@expo/vector-icons";

export default function HomepageButton({ isReserveButton = true }) {
  const navigation = useNavigation();
  function onPress() {
    isReserveButton ? gotoReservePage() : gotoFaqPage();
  }

  function gotoFaqPage() {
    navigation.navigate("FAQ");
  }

  function gotoReservePage() {
    navigation.navigate("Reserve");
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[GeneralStyles.buttonContainer, styles.homepageButton]}
    >
      <>
        <Ionicons
          name={isReserveButton ? "ios-basket" : "ios-help-circle"}
          size={30}
          color={"#450084"}
        />

        <Text>{isReserveButton ? "Reserve Food" : "FAQs"}</Text>
      </>
    </TouchableOpacity>
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
