import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FoodList from "../components/FoodList";
import FoodBackground from "../components/FoodBackground";
import MyHeader from "../components/MyHeader";

export default function Reserve({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"Reserve Food"} />

      <View style={styles.body}>
        <FoodBackground isDark={false}>
          <FoodList />
        </FoodBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    //The height of the header is 80
    marginTop: 80,
    flex: 1,
  },
});
