import React, { useState, createContext } from "react";

export const CartContext = createContext();

const CartProvider = props => {
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
