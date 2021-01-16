import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/general/MyHeader";
import FoodBackground from "../components/general/FoodBackground";
import ReceiptsList from "../components/receipts/ReceiptsList";

export default function Receipts() {
  return (
    <MyHeader title="My Receipts">
      {/* children appear beneath the header */}
      <FoodBackground isDark={false}>
        <ReceiptsList />
      </FoodBackground>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
