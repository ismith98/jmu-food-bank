import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RemoveFromCartModal({
  modalVisible,
  setModalVisible,
  setCartTotal,
  setItemsInCart,
  currentItem,
}) {
  function removeItemFromCart() {
    setCartTotal((prevTotal) => prevTotal - currentItem.amount);
    setItemsInCart((prevItems) =>
      prevItems.filter((item) => item.name !== currentItem.name)
    );
  }
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons name="ios-warning" size={36} color="#450084" />
          <Text style={styles.modalText}>
            Are you sure you want to continue?
          </Text>

          <TouchableHighlight
            style={{ ...styles.button, ...styles.deleteButton }}
            onPress={() => {
              removeItemFromCart();
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Yes, delete the item</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.button, ...styles.returnButton }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>No, take me back</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: "#5800A8",
    marginBottom: 10,
  },
  returnButton: {
    backgroundColor: "#6c757d",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },
});
//backgroundColor: "#2196F3"
