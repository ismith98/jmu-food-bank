import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FoodList from "../components/FoodList";
import FoodBackground from "../components/FoodBackground";
import MyHeader from "../components/MyHeader";

const Stack = createStackNavigator();
// heigh of header is 24
export default function Reserve({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={"Reserve Food"} />

      <View style={styles.body}>
        <FoodBackground isDark={false} child={<FoodList />} />
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
