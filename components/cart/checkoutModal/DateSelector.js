import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "react-native-button";

export default function DateSelector({ dates, setDates }) {
  function changeSelected(date) {
    if (!date.isSelected) {
      setDates((prevDates) =>
        prevDates.map((prevDate) => {
          if (prevDate.isSelected) {
            prevDate.isSelected = false;
          } else if (prevDate === date) {
            prevDate.isSelected = true;
          }
          return prevDate;
        })
      );
    }
  }
  return (
    <View style={styles.container}>
      {dates.map((date) => (
        <>
          {/*
          <Button
            title={date.label}
            color={date.isSelected ? "#5800A8" : "#82888D"}
            onPress={() => changeSelected(date)}
            key={date.label}
          />
        */}
          <Button
            onPress={() => changeSelected(date)}
            key={date.label}
            style={[
              date.isSelected
                ? { backgroundColor: "#5800A8" }
                : { backgroundColor: "#82888D" },
              styles.button,
            ]}
          >
            {date.label}
          </Button>
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  button: {
    padding: 5,
    //elevation: 2,
    color: "white",
    fontFamily: "Roboto",
    fontSize: 16,
    //fontWeight: "bold",
  },
});
