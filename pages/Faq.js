import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import GeneralStyles from "../styles/GeneralStyles";

export default function Faq({ navigation }) {
  return (
    <MyHeader title={"FAQs"}>
      {/* children appear beneath the header */}
      <Text>FAQs</Text>
      <Text style={{ position: "absolute", bottom: 0 }}>Gb</Text>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
