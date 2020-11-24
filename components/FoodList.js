import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import FoodCard from "./FoodCard";
import UserList from "./UserList";
import firebase from "../firebase";

export default function FoodList() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [start, setStart] = useState(0);
  var counter = 0;
  useEffect(() => {
    console.log("effect");
    setStart(0);
    getFoodItems(0);
    return () => {};
  }, []);

  function handleRefresh() {
    console.log("refresh");
    counter = 0;
    setRefreshing(true);
    setFoodItems([]);
    setStart(0);
    let startAt = 0;
    getFoodItems(startAt);
  }

  function getFoodItems(startAt) {
    setLoading(true);
    const NUMBER_OF_RESULTS = 10;

    const foodItemsRef = firebase.database().ref("foodItems/");
    foodItemsRef
      .orderByKey()
      .limitToFirst(NUMBER_OF_RESULTS)
      .startAt(`${startAt}`)
      .once("value", (snapshot) => {
        setLoading(false);
        setRefreshing(false);
        console.log(start, startAt, counter);
        let value = snapshot.val();
        if (value !== null) {
          console.log("yes");
          setFoodItems((prevItems) => prevItems.concat(Object.values(value)));
        }
        counter += NUMBER_OF_RESULTS + 3;
        setStart(startAt + NUMBER_OF_RESULTS + 3);
      });
  }

  function renderHeader() {
    return <SearchBar placeholder="type here..." lightTheme round />;
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

      <FlatList
        data={foodItems}
        keyExtractor={({ index }) => index}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={() => getFoodItems(start)}
        onEndReachedThreshold={0.4}
        renderItem={({ item, index }) => (
          <FoodCard foodItem={item} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
