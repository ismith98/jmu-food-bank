import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import FoodBackground from "../components/FoodBackground";
import FaqList from "../components/faqs/FaqList";

export default function Faq({ navigation }) {
  return (
    <MyHeader title={"FAQs"}>
      {/* children appear beneath the header */}
      <FoodBackground isDark={false}>
        <FaqList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
