import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import OrderCard from "./OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../contexts/CartContext";
import { useErrorAlert } from "../hooks/useAlert";
import ClearOrdersButton from "./ClearOrdersButton";

export default function OrdersList() {
  const { orderComplete, setOrderCompleteSemtex } = useCart();
  const [isEmpty, setIsEmpty] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    getOrdersFromPhoneStorage();
    if (orderComplete) {
      setOrderCompleteSemtex((prev) => prev - 1);
    }

    return () => {};
  }, [orderComplete, isClearing]);

  async function getOrdersFromPhoneStorage() {
    console.log("get order from phone storage");
    try {
      let value = await AsyncStorage.getItem("@food-bank-orders");
      value = JSON.parse(value);
      console.log(value);
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
              <OrderCard order={item} key={index} />
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
      <ClearOrdersButton clearOrders={clearOrders} />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyOrdersView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    //height: 100,
    //backgroundColor: "#EDEDED",
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
