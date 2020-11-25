import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import FoodCard from "./FoodCard";
import UserList from "./UserList";
import firebase from "../firebase";

export default function FoodList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  var counter = 0;

  useEffect(() => {
    console.log("effect");
    getFoodItems();
    return () => {};
  }, []);

  function handleRefresh() {
    console.log("refresh");
    counter = 0;
    setRefreshing(true);
    setFoodItems([]);
    getFoodItems();
  }

  function getFoodItems() {
    setLoading(true);

    const foodItemsRef = firebase.database().ref("foodItems/");
    foodItemsRef
      .orderByKey()
      .startAt(`0`)
      .once("value", (snapshot) => {
        setLoading(false);
        setRefreshing(false);
        console.log(counter);
        let value = snapshot.val();
        if (value !== null) {
          console.log("yes");
          setFoodItems(Object.values(value));
          setFilteredFoodItems(Object.values(value));
        }
        counter += 3;
      });
  }

  function filterItems(text) {
    setSearchBarText(text);
    let filteredItems = foodItems.filter((item) => {
      let name = item.name.toLowerCase();
      return name.includes(text.toLowerCase());
    });
    setFilteredFoodItems(filteredItems);
  }

  function renderFooter() {
    if (!loading) return null;
    else {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/*<UserList />*/}
      <SearchBar
        onChangeText={filterItems}
        value={searchBarText}
        placeholder="type here..."
        platform="ios"
        lightTheme
        round
      />
      <FlatList
        data={filteredFoodItems}
        keyExtractor={({ index }) => index}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item, index }) => (
          <FoodCard foodItem={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
