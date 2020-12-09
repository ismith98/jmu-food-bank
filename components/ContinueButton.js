import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import ConfirmModal from "./ConfirmModal";

export default function ContinueButton() {
  const [modalVisible, setModalVisible] = useState(false);

  function onConfrim() {
    console.log("confirm");
  }

  return (
    <>
      <TouchableHighlight
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableHighlight>
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={onConfrim}
        confirmButtonText="Checkout"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#CBB677",
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
  },
});
