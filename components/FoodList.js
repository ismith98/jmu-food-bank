import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import FoodCard from "./FoodCard";
//import foodItems from "../foodItems.json";
import UserList from "./UserList";
import firebase from "../firebase";

export default function FoodList() {
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    console.log("effect");
    setStart(0);
    getFoodItems(0);
    //setLoading(true)
    return () => {};
  }, []);

  function handleRefresh() {
    console.log("refresh");

    setFoodItems([]);
    setStart(0);
    let startAt = 0;
    getFoodItems(startAt);
  }

  function getFoodItems(startAt) {
    setLoading(true);
    const NUMBER_OF_RESULTS = 6;

    const foodItemsRef = firebase.database().ref("foodItems/");
    foodItemsRef
      .orderByKey()
      .limitToFirst(NUMBER_OF_RESULTS)
      .startAt(`${startAt}`)
      .once("value", (snapshot) => {
        setLoading(false);
        console.log(start, startAt);
        let value = snapshot.val();
        if (value !== null) {
          console.log("yes");
          setFoodItems((prevItems) =>
            //prevItems.concat(Object.values(snapshot.val()))
            prevItems.concat(Object.values(value))
          );
          /*
          foodItems.length
            ? setFoodItems((prevItems) =>
                prevItems.concat(Object.values(snapshot.val()))
              )
            : setFoodItems((prevItems) =>
                prevItems.concat(Object.values(snapshot.val()))
              );
          /*
          setFoodItems((prevItems) => {
            prevItems.concat(Object.values(value));
          });
          */
        }
        /*
        startAt === 0
          ? setFoodItems(Object.values(snapshot.val()))
          : setFoodItems(foodItems.concat( Object.values(snapshot.val())));
          */
        //startAt++;
        setStart(startAt + NUMBER_OF_RESULTS + 3);
      });
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
          <ActivityIndicator animating size="large" />
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
        //ListFooterComponent={renderFooter}
        refreshing={loading}
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
/*
        data={foodItems}
        keyExtractor={({ foodItem }) => foodItem.item}
        renderItem={({ foodItem }) => (
          <FoodCard foodItem={foodItem} key={foodItem.item} />
        )*/

const styles = StyleSheet.create({});
