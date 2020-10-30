import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FoodBackground from "../components/FoodBackground";
import LocationContent from "../components/LocationContent";

export default function PickLocation() {
  return <FoodBackground child={<LocationContent />} isDark={false} />;
}

const styles = StyleSheet.create({});
