import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TimeSelector({
  maxTime,
  hourCounter,
  setHourCounter,
  minuteCounter,
  setMinuteCounter,
}) {
  const [maxTimeArray, setMaxTimeArray] = useState(maxTime.split(":"));

  function incrementHour() {
    if (hourCounter === 12) {
      setHourCounter(1);
    } else if (hourCounter != maxTimeArray[0]) {
      setHourCounter(hourCounter + 1);
      if (minuteCounter === 45) {
        setMinuteCounter(30);
      }
    }
  }
  function decrementHour() {
    if (hourCounter === 1) {
      setHourCounter(12);
    } else if (hourCounter !== 12) {
      setHourCounter(hourCounter - 1);
    }
  }

  function incrementMinute() {
    if (hourCounter == maxTimeArray[0] && minuteCounter == maxTimeArray[1]) {
      return;
    } else if (minuteCounter === 45) {
      incrementHour();
      setMinuteCounter(0);
    } else {
      setMinuteCounter(minuteCounter + 15);
    }
  }
  function decrementMinute() {
    if (hourCounter === 12 && minuteCounter === 0) {
      return;
    } else if (minuteCounter === 0) {
      decrementHour();
      setMinuteCounter(45);
    } else {
      setMinuteCounter(minuteCounter - 15);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.hourCol]}>
        <TouchableHighlight
          onPress={incrementHour}
          style={[styles.button, styles.hourButton]}
        >
          <Ionicons name="md-add" size={20} color="white" />
        </TouchableHighlight>
        <View style={styles.textView}>
          <Text style={styles.timeText}>{hourCounter}</Text>
        </View>
        <TouchableHighlight
          onPress={decrementHour}
          style={[styles.button, styles.hourButton]}
        >
          <Ionicons name="md-remove" size={20} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.column}>
        <TouchableHighlight onPress={incrementMinute} style={styles.button}>
          <Ionicons name="md-add" size={20} color="white" />
        </TouchableHighlight>
        <View style={styles.textView}>
          <Text style={styles.timeText}>
            :{minuteCounter === 0 ? "00" : minuteCounter} PM
          </Text>
        </View>

        <TouchableHighlight onPress={decrementMinute} style={styles.button}>
          <Ionicons name="md-remove" size={20} color="white" />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: "100%",
    //borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#82888D",
  },
  hourButton: {
    borderRightWidth: 0.5,
  },
  timeText: {
    paddingHorizontal: 10,
    fontFamily: "Roboto",
    fontSize: 20,
  },
  textView: {
    height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  hourCol: {
    width: 55,
  },
  container: {
    //width: 100,
    flexDirection: "row",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    //marginHorizontal: 1,
    //margin: 5,
    //borderWidth: 0.5,
  },
});
