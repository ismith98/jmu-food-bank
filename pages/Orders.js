import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import LocationCard from "../components/LocationCard";

export default function Orders() {
  return (
    <MyHeader title="My Orders">
      {/* children appear beneath the header */}
      <Text></Text>
      <LocationCard />
    </MyHeader>
  );
}

const styles = StyleSheet.create({});
