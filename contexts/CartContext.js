import React, { useState, useContext } from "react";

const CartContext = React.createContext();

export function useContext() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [foodItemsInCart, setFoodItemsInCart] = useState([]);
  //contains the item id, item name, and amount in cart
  //item name will be used for the order info during checkout

  return (
    <CartContext.Provider value={{ foodItemsInCart, setFoodItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
}
