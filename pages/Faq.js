import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import GeneralStyles from "../styles/GeneralStyles";

export default function Faq({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"FAQs"} />

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
