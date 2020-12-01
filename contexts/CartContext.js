import React, { useState, useContext } from "react";
import humanId from "human-id";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  //contains the item id, item name, and amount in cart
  //item name will be used for the order info during checkout

  function onContinue() {
    let id = humanId("-");
  }

  function addToDb() {}

  return (
    <CartContext.Provider
      value={{ itemsInCart, setItemsInCart, cartTotal, setCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
