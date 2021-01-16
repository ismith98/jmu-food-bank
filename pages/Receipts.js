import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import FoodBackground from "../components/FoodBackground";
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
