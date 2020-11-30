import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import FoodCard from "./FoodCard";
import firebase from "../firebase";
import useUpdateLogger from "../hooks/useUpdateLogger";

export default function FoodList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  useUpdateLogger(foodItems);
  //useUpdateLogger(filteredFoodItems);

  useEffect(() => {
    getFoodItems();
    return () => {};
  }, []);

  function handleRefresh() {
    console.log("refresh", foodItems[0].name, foodItems[0].amountInCart);
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

        let value = snapshot.val();
        if (value !== null) {
          console.log("yes");
          let items = Object.values(value);
          /*
          if (!refreshing) {
            setFoodItems(items.map((item) => (item.amountInCart = 0)));
          } else {
            setFoodItems((prevFoodItems) => {
              let prevItems = [...prevFoodItems];
              return items.map((item) => {
                prevItems.includes((prevItem) => prevItem.name === item.name)
                  ? (item.amountInCart = 0)
                  : (item.amountInCart = prevItem.amountInCart);
              });
            });
          }
          */
          setFoodItems(items);
          setFilteredFoodItems(items);
        }
        setRefreshing(false);
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
        placeholder="Search for food"
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
          <FoodCard currentItem={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
