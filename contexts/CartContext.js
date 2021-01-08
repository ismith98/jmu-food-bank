import React, { useState, useContext, useEffect } from "react";
import humanId from "human-id";
import firebase from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlert, useErrorAlert } from "../hooks/useAlert";
import useUpdateLogger from "../hooks/useUpdateLogger";
//import dayjs from "dayjs";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [startOrder, setStartOrder] = useState(false);
  const NUM_THREADS = 3;
  const [threadsStillProcessing, setThreadsStillProcessing] = useState(
    NUM_THREADS
  );
  const [pickupDate, setPickupDate] = useState("");
  const [inventoryAvailable, setInventoryAvailable] = useState(true);
  const [unprocessedItems, setUnprocessedItems] = useState(3);
  const [orderInfo, setOrderInfo] = useState();
  const [nameOfItemUnavailable, setNameOfItemUnavailable] = useState(""); // nameOfItemUnavailable
  const [visitedAllItems, setVisitedAllItems] = useState(false);

  //contains the item id, item name, and amount in cart
  //item name will be used for the order info during checkout

  useEffect(() => {
    console.log(unprocessedItems, inventoryAvailable, visitedAllItems);
    if (unprocessedItems === 0 && inventoryAvailable && visitedAllItems) {
      //addOrderToDb(orderDetails);
      addOrderToDb(orderInfo);
    } else if (!inventoryAvailable && visitedAllItems) {
      console.log("visited all items and inv not avail");
      useErrorAlert(`there are no longer enough ${nameOfItemUnavailable}`);
      // Cleanup
      setVisitedAllItems(false);
      setStartOrder(false);
      setOrderComplete(true);
    }
    return () => {};
  }, [unprocessedItems, inventoryAvailable, visitedAllItems]);

  useEffect(() => {
    if (threadsStillProcessing === 0) {
      setOrderComplete(false);
      setThreadsStillProcessing(NUM_THREADS);
    }
    return () => {};
  }, [threadsStillProcessing]);

  function onCheckout() {
    // gather details
    let orderId = humanId("-");
    let timeOrdered = new Date();
    let orderDetails = {
      orderId: orderId,
      timeOrdered: timeOrdered.toString(),
      itemsInCart: itemsInCart,
      pickupTime: pickupDate,
    };

    setStartOrder(true);
    setOrderComplete(false);
    setInventoryAvailable(true);
    setOrderInfo(orderDetails);
    setVisitedAllItems(false);
    setUnprocessedItems(itemsInCart.length);

    //modify db
    modifyDb(orderDetails);
  }

  function modifyDb(orderDetails) {
    checkInventoryForEachItem(orderDetails);
  }

  function checkInventoryForEachItem(orderDetails) {
    itemsInCart.forEach((item) => checkInventoryForOneItem(item, orderDetails));
  }

  function checkInventoryForOneItem(item, orderDetails) {
    const foodItemsRef = firebase.database().ref(`foodItems/${item.id}/`);
    foodItemsRef.transaction(
      (foodItem) => {
        if (foodItem) {
          console.log(foodItem);
          let itemsAvailable =
            foodItem.totalInventory - foodItem.amountReserved - item.amount >=
            0;
          if (!itemsAvailable) {
            setInventoryAvailable(false);
          }
          if (itemsAvailable) {
            foodItem.amountReserved += item.amount;
          } else {
            return;
          }
        }
        return foodItem;
      },
      function (error, committed, snapshot) {
        if (error) {
          useErrorAlert(`Error reserving ${item.name} |  ${error}`);
          setStartOrder(false);
          setOrderComplete(true);
        } else if (!committed) {
          setNameOfItemUnavailable(item.name);
          /*
          setStartOrder(false);
          setOrderComplete(true);*/
        } else if (committed) {
          // If its the last item in the cart
          /*
          console.log("invetory available", inventoryAvailable);
          if (
            inventoryAvailable &&
            item.id === itemsInCart[itemsInCart.length - 1].id
          ) {
            addOrderToDb(orderDetails);
          }
          */
          //if (item.id === itemsInCart[itemsInCart.length - 1].id) {
          //  setVisitedAllItems(true);
          //}
          setUnprocessedItems((prevAmount) => prevAmount - 1);
        }
        if (item.id === itemsInCart[itemsInCart.length - 1].id) {
          setVisitedAllItems(true);
        }

        //console.log("Food Item's data: ", snapshot.val());
      }
    );
  }

  function addOrderToDb(orderDetails) {
    var itemKeyExists = false;
    const ordersRef = firebase.database().ref(`orders/${orderDetails.orderId}`);
    ordersRef.transaction(
      (currentData) => {
        if (currentData === null) {
          return orderDetails;
        } else {
          //Item key already exists
          itemKeyExists = true;
        }
      },
      function (error, committed, snapshot) {
        if (error) {
          useErrorAlert(`Error adding your order to our Database |  ${error}`);
          setStartOrder(false);
          setOrderComplete(true);
        } else if (committed) {
          addOrderToPhoneStorage(orderDetails);
        }

        //console.log("Food Item's data: ", snapshot.val());
        if (itemKeyExists) {
          orderDetails.orderId = humanId("-");
          addOrderToDb(orderDetails);
        }
      }
    );
  }

  async function addOrderToPhoneStorage(orderDetails) {
    console.log("add order to phone storage");

    try {
      const value = await AsyncStorage.getItem("@food-bank-orders");
      if (value === null) {
        // add new storage value
        let order = new Array(orderDetails);
        await AsyncStorage.setItem("@food-bank-orders", JSON.stringify(order));
      } else {
        // add storage value to front of the list
        let prevOrders = JSON.parse(value);
        prevOrders.unshift(orderDetails);
        await AsyncStorage.setItem(
          "@food-bank-orders",
          JSON.stringify(prevOrders)
        );
      }

      // cleanup
      setOrderComplete(true);
      setStartOrder(false);
      setCartTotal(0);
      setItemsInCart([]);
      useAlert("Order Placed", `Your order id is ${orderDetails.orderId}`);
    } catch (e) {
      // error reading value
      useErrorAlert(
        `Order placed but problem uploading it to device storage: Notify jmu pop up pantry ${e}`
      );
      setStartOrder(false);
      setOrderComplete(true);
    }
  }

  return (
    <CartContext.Provider
      value={{
        itemsInCart,
        setItemsInCart,
        cartTotal,
        setCartTotal,
        onCheckout,
        orderComplete,
        setThreadsStillProcessing,
        setPickupDate,
        startOrder,
        unprocessedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
