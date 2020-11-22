import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import FoodCard from "./FoodCard";
import foodItems from "../foodItems.json";
import UserList from "./UserList";
const axios = require("axios").default;

export default function FoodList() {
  function getFoodItems() {
    const limitToFirst = 20;
    const seed = 1;
    const api = `https://food-bank-app-9f088.firebaseio.com/foodItems.json?orderBy="$key"&limitToFirst=${limitToFirst}&startAt="${seed}"`;
    axios.get(api).then((res) => {
      console.log(res.data);
    });
  }

  //getFoodItems();

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <UserList />
      {/*
      <FlatList
        data={foodItems}
        keyExtractor={({ index }) => index}
        renderItem={({ item, index }) => (
          <FoodCard foodItem={item} key={index} />
        )}
      />
      */}
    </View>
  );
}
/*
        data={foodItems}
        keyExtractor={({ foodItem }) => foodItem.item}
        renderItem={({ foodItem }) => (
          <FoodCard foodItem={foodItem} key={foodItem.item} />
        )*/

const styles = StyleSheet.create({});
