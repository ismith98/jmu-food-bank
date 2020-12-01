import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodBackground from "./FoodBackground";
import PropTypes from "prop-types";

export default function ConfirmModal({
  modalVisible,
  setModalVisible,
  onConfirm,
  confirmButtonText,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FoodBackground isDark={false} fullScreen={false}>
            <View style={styles.modalViewPadding}>
              <Ionicons name="ios-warning" size={36} color="#450084" />
              <Text style={styles.modalText}>
                Are you sure you want to continue?
              </Text>

              <TouchableHighlight
                style={{ ...styles.button, ...styles.deleteButton }}
                onPress={() => {
                  onConfirm();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>{confirmButtonText}</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.button, ...styles.returnButton }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No, take me back</Text>
              </TouchableHighlight>
            </View>
          </FoodBackground>
        </View>
      </View>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  onConfirm: PropTypes.func,
  confirmButtonText: PropTypes.string,
};

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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalViewPadding: {
    padding: 35,
    alignItems: "center",
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
