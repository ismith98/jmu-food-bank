import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ReceiptCard from "./ReceiptCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../../contexts/CartContext";
import { useErrorAlert } from "../../hooks/useAlert";
import ClearReceiptsButton from "./ClearReceiptsButton";

export default function ReceiptsList() {
  const { orderComplete, setThreadsStillProcessing } = useCart();
  const [isEmpty, setIsEmpty] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    getOrdersFromPhoneStorage();
    if (orderComplete) {
      setThreadsStillProcessing((prev) => prev - 1);
    }

    return () => {};
  }, [orderComplete, isClearing]);

  async function getOrdersFromPhoneStorage() {
    try {
      let value = await AsyncStorage.getItem("@food-bank-orders");
      value = JSON.parse(value);
      if (value === null) {
        setIsEmpty(true);
      } else {
        setOrders(value);
        setIsEmpty(false);
      }
    } catch (e) {
      // error reading value
      useErrorAlert(`Unable to get orders from your phone's storage ${e}`);
    }
  }

  async function clearOrders() {
    setIsClearing(!isClearing);
    await AsyncStorage.removeItem("@food-bank-orders");
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {!isEmpty ? (
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderId}
            renderItem={({ item, index }) => (
              <ReceiptCard order={item} key={index} />
            )}
          />
        </>
      ) : (
        <View style={styles.emptyOrdersView}>
          <View style={styles.bg}>
            <Text style={styles.emptyOrdersText}>
              No orders placed {"\n"} Go to the reserve page
            </Text>
          </View>
        </View>
      )}
      <ClearReceiptsButton clearOrders={clearOrders} />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyOrdersView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bg: {
    backgroundColor: "#EDEDED",
    padding: 5,
    borderRadius: 5,
  },
  emptyOrdersText: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
});
