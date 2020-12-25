import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

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
        <Button
          title={date.label}
          color={date.isSelected ? "#5800A8" : "#82888D"}
          onPress={() => changeSelected(date)}
          key={date.label}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});
