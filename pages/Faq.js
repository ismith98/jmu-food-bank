import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import GeneralStyles from "../styles/GeneralStyles";
import FaqList from "../components/FaqList";

export default function Faq({ navigation }) {
  return (
    <MyHeader title={"FAQs"}>
      {/* children appear beneath the header */}
      <FaqList />
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
