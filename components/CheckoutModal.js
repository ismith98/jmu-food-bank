import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FoodBackground from "./FoodBackground";
import ConfirmModal from "./ConfirmModal";
import { useCart } from "../contexts/CartContext";
import usePickupTimes from "../hooks/usePickupTimes";
import dayjs from "dayjs";
import useUpdateLogger from "../hooks/useUpdateLogger";
import TimeSelector from "./TimeSelector";
import DateSelector from "./DateSelector";

export default function CheckoutModal({ modalVisible, setModalVisible }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { onCheckout, setPickupDate } = useCart();
  const [pickupTime, setPickupTime] = useState("");
  const [dates, setDates] = useState([]);
  const [mondayHours, setMondayHours] = useState([]);
  const [wednesdayHours, setWednesdayHours] = useState([]);
  const [hourCounter, setHourCounter] = useState(12);
  const [minuteCounter, setMinuteCounter] = useState(0);
  //useUpdateLogger(pickupDay);
  //useUpdateLogger(dates);

  useEffect(() => {
    console.log("useEffect");
    let pickupInfo = usePickupTimes();
    setMondayHours(pickupInfo.mondayHours);
    setWednesdayHours(pickupInfo.wednesdayHours);
    let days = pickupInfo.dates;
    days = days.map((day, index) => {
      return {
        value: day,
        label: day.format("dddd M/D"),
        isSelected: index === 0 ? true : false,
        key: day.format("dddd M/D"),
      };
    });
    setDates(days);
    //setPickupDay(days[0]);
    setPickupTime(pickupInfo.mondayHours[0].label);

    return () => {};
  }, []);

  function onContinue() {
    let chosenDate = dates.find((date) => date.isSelected).value;
    chosenDate = chosenDate.hour(hourCounter === 12 ? 12 : 12 + hourCounter);
    chosenDate = chosenDate.minute(minuteCounter);
    chosenDate = chosenDate.second(0);
    //console.log(`${chosenDate.toString()}`);
    setPickupDate(chosenDate.toDate().toString());
  }

  function onConfirm() {
    onCheckout();
    setModalVisible(false);
  }
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FoodBackground isDark={false} fullScreen={false}>
              <View style={styles.modalViewPadding}>
                <Ionicons name="ios-calendar" size={36} color="#450084" />
                <Text style={styles.modalText}>
                  Choose the pickup date and time
                </Text>
                <Text style={styles.modalText}>
                  Hours: Monday from 12-5, Wednesday from 12-6
                </Text>
                <Text style={styles.modalText}>Pickup Date</Text>
                <DateSelector dates={dates} setDates={setDates} />
                <Text style={styles.modalText}>Pickup Time</Text>
                <TimeSelector
                  maxTime={"4:30"}
                  hourCounter={hourCounter}
                  setHourCounter={setHourCounter}
                  minuteCounter={minuteCounter}
                  setMinuteCounter={setMinuteCounter}
                />
                <TouchableHighlight
                  style={{ ...styles.button, ...styles.continueButton }}
                  onPress={() => {
                    onContinue();
                    setShowConfirmModal(true);
                  }}
                >
                  <Text style={styles.textStyle}>Continue</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.button, ...styles.returnButton }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Go back</Text>
                </TouchableHighlight>
              </View>
            </FoodBackground>
          </View>
        </View>
      </Modal>
      <ConfirmModal
        modalVisible={showConfirmModal}
        setModalVisible={setShowConfirmModal}
        onConfirm={onConfirm}
        confirmButtonText="Checkout"
      />
    </>
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
  continueButton: {
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
    marginBottom: 2.5,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  pickerStyle: {
    color: "black",
    borderWidth: 1,
    borderColor: "black",
  },
});
//backgroundColor: "#2196F3"

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "black",
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
});

/*pickupDay.includes("Monday") ? mondayHours : wednesdayHours*/
