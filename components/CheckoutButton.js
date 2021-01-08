import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useCart } from "../contexts/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function CheckoutButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    orderComplete,
    setThreadsStillProcessing,
    unprocessedItems,
  } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    if (orderComplete && unprocessedItems === 0) {
      navigation.navigate("Reciepts");
      setThreadsStillProcessing((prev) => prev - 1);
    }
    return () => {};
  }, [orderComplete]);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
      <CheckoutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cca532",
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
