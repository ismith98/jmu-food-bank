import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import GeneralStyles from "../styles/GeneralStyles";

const headerHeight = 80;

export default function Faq({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"FAQs"} headerHeight={headerHeight} />

      <View style={styles.body}>
        <Text>FAQs</Text>
        <Text style={{ position: "absolute", bottom: 0 }}>Gb</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 80,
    flex: 1,
  },
});
