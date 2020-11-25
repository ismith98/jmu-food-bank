import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function CartList() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SearchBar
        //onChangeText={filterItems}
        //value={searchBarText}
        placeholder="Search for food"
        platform="ios"
        lightTheme
        round
      />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>
          No Items are currently in your cart. {"\n"} Add some from the reserve
          page.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
