import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ConfirmModal from "./ConfirmModal";

export default function ClearOrdersButton({ clearOrders }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true) /*setModalVisible(true)*/}
      >
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <ConfirmModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
        onConfirm={clearOrders}
        confirmButtonText="Delete your records of orders (Does not cancel the orders)"
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
