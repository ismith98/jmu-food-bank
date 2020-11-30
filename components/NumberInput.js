import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NumberInput({ value, onChangeValue, minValue = 0 }) {
  function incrementValue() {
    isInBounds(value + 1) ? onChangeValue(value + 1) : null;
  }

  function decrementValue() {
    isInBounds(value - 1) ? onChangeValue(value - 1) : null;
  }

  function isInBounds(text) {
    return text >= minValue;
  }

  return (
    <View style={styles.view}>
      <TouchableHighlight style={{ flex: 1 }} onPress={decrementValue}>
        <View style={styles.button}>
          <Ionicons name="md-remove" size={16} color="white" />
        </View>
      </TouchableHighlight>
      <TextInput
        style={styles.text}
        onChangeText={(text) =>
          isInBounds(Number(text)) ? onChangeValue(Number(text)) : null
        }
        value={`${value}`}
        keyboardType="numeric"
      />
      <TouchableHighlight style={{ flex: 1 }} onPress={incrementValue}>
        <View style={styles.button}>
          <Ionicons name="md-add" size={16} color="white" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
    backgroundColor: "#450084",
    /*
    borderColor: "#450084",
    borderWidth: 2,
    */
  },
  view: {
    flex: 1,
    flexDirection: "row",
    width: 65,
    height: "100%",
  },
  button: {
    backgroundColor: "#5800A8",
    //backgroundColor: "#6400c1",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 20,
  },
});
