import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";

export default function MyHeader({ title, children }) {
  return (
    <>
      <SafeAreaView style={styles.header}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
      </SafeAreaView>
      <View style={styles.body}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#450084",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: 80,
    elevation: 4,
    borderBottomColor: "rgb(216, 216, 216)",
    shadowColor: "rgb(216, 216, 216)",

    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  text: {
    fontSize: 20,
    fontFamily: "RobotoCondensed",
    fontWeight: "normal",
    color: "#fff",
    left: 16,
    top: 15,
  },
  body: {
    //The height of the header is 80
    marginTop: 80,
    flex: 1,
  },
});
