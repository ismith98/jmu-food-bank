import React, { useState, useContext, useEffect } from "react";
import humanId from "human-id";
import firebase from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlert, useErrorAlert } from "../hooks/useAlert";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const SEMTEX_AMOUNT = 2;
  const [orderCompleteSemtex, setOrderCompleteSemtex] = useState(SEMTEX_AMOUNT);
  //contains the item id, item name, and amount in cart
  //item name will be used for the order info during checkout

  useEffect(() => {
    if (orderCompleteSemtex === 0) {
      setOrderComplete(false);
      setOrderCompleteSemtex(SEMTEX_AMOUNT);
    }
    return () => {};
  }, [orderCompleteSemtex]);

  function onCheckout() {
    // gather details
    let orderId = humanId("-");
    let date = new Date();
    let orderDetails = {
      orderId: orderId,
      date: date.toString(),
      itemsInCart: itemsInCart,
    };

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
    var inventoryAvailable;
    const foodItemsRef = firebase.database().ref(`foodItems/${item.id}/`);
    foodItemsRef.transaction(
      (foodItem) => {
        if (foodItem) {
          inventoryAvailable =
            foodItem.totalInventory - foodItem.amountReserved - item.amount >=
            0;
          if (inventoryAvailable) {
            foodItem.amountReserved += item.amount;
          } else {
            useErrorAlert(`there are no longer enough ${item.name}`);
          }
        }
        return foodItem;
      },
      function (error, committed, snapshot) {
        if (error) {
          useErrorAlert(`Error reserving ${item.name} |  ${error}`);
        } else {
          // If its the last item in the cart
          if (
            inventoryAvailable &&
            item.id === itemsInCart[itemsInCart.length - 1].id
          ) {
            addOrderToDb(orderDetails);
          }
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
        } else {
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
    /*
    try {
      const value = await AsyncStorage.getItem("@food-bank-orders");
      if (value === null) {
        // add new storage value
        await AsyncStorage.setItem("@food-bank-orders", `[${orderDetails}]`);
      } else {
        // append storage value
        let prevOrders = JSON.parse(value);
        prevOrders.push(orderDetails);
        await AsyncStorage.setItem(
          "@food-bank-orders",
          JSON.stringify(prevOrders)
        );
      }
    } catch (e) {
      // error reading value
      useErrorAlert(`error uploading order to device storage ${e}`);
    }
    */
    setOrderComplete(true);
    setCartTotal(0);
    setItemsInCart([]);
    useAlert(
      "Success",
      `You've succesfully placed an order. Here's your Id: ${orderDetails.orderId}`
    );
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
        setOrderCompleteSemtex,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
