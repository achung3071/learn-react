import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDsLY-WXBtj9SVEbN2mHh3naElCz5a1W6s",
  authDomain: "learn-react-5588c.firebaseapp.com",
  databaseURL: "https://learn-react-5588c.firebaseio.com",
  projectId: "learn-react-5588c",
  storageBucket: "learn-react-5588c.appspot.com",
  messagingSenderId: "1089750649744",
  appId: "1:1089750649744:web:9e0e44d88621f47a174115"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();
export const CartContext = createContext();

const CartProvider = ({ user, children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (user) {
      db.child("carts").update({ [user.uid]: cartProducts });
    }
  });
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
