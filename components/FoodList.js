import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import FoodCard from "./FoodCard";
import firebase from "../firebase";
import useUpdateLogger from "../hooks/useUpdateLogger";
import { useCart } from "../contexts/CartContext";

export default function FoodList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const { orderComplete, setOrderCompleteSemtex } = useCart();
  //useUpdateLogger(foodItems);
  //useUpdateLogger(filteredFoodItems);

  useEffect(() => {
    getFoodItems();
    return () => {};
  }, []);

  useEffect(() => {
    if (orderComplete) {
      handleRefresh();
      setOrderCompleteSemtex((prev) => prev - 1);
    }
    return () => {};
  }, [orderComplete]);

  function handleRefresh() {
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
        let value = snapshot.val();
        if (value !== null) {
          let items = Object.values(value);
          setFoodItems(items);
          setFilteredFoodItems(items);
        }
        setLoading(false);
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
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
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
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <FoodCard currentItem={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
