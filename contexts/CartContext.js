import React, { useState, useContext } from "react";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  //contains the item id, item name, and amount in cart
  //item name will be used for the order info during checkout
  /*
  useEffect(() => {
    console.log(cartTotal);
    return () => {};
  }, [cartTotal]);
  /*
  useEffect(() => {
    let number = calculateNumItemsInCart();
    setNumItemsInCart(number);
    return () => {};
  }, [itemsInCart]);

  function calculateNumItemsInCart() {
    return itemsInCart.reduce((aggregator, item) => aggregator + item.amount);
  }
*/
  return (
    <CartContext.Provider
      value={{ itemsInCart, setItemsInCart, cartTotal, setCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
