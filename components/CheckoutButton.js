import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useCart } from "../contexts/CartContext";
import ConfirmModal from "./ConfirmModal";

export default function CheckoutButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const { onCheckout, orderComplete, setOrderCompleteSemtex } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    if (orderComplete) {
      navigation.navigate("Orders");
      setOrderCompleteSemtex((prev) => prev - 1);
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
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={onCheckout}
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
