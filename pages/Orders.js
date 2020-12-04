import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";

export default function Orders() {
  return (
    <MyHeader title="My Orders">
      {/* children appear beneath the header */}
      <Text></Text>
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
