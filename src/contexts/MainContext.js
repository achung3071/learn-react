import React, { createContext, useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/auth";
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

export const MainContext = createContext();

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const MainProvider = props => {
  const [inventory, setInventory] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      const inventory = snap.val();
      delete inventory.carts;
      for (const product of cartProducts) {
        inventory[product.sku][product.size] -= product.quantity;
      }
      setInventory(inventory);
    };
    // When writing shopping carts to db, values are updated.
    // .on() will pull / reset inventory again: use .once() instead
    db.once("value", handleData, error => alert(error));
  }, [cartProducts]);

  const prevCart = usePrevious(cartProducts);
  useEffect(() => {
    const initialLoading = !cartProducts.length && !prevCart;
    if (user && prevCart !== cartProducts && !initialLoading) {
      // Need .length, as not having it will reset DB cart as empty array on all reloads
      // Compare prevCart, cartProducts so DB updates cartProducts on login, not vice versa
      db.child("carts").update({ [user.uid]: cartProducts });
    }
  }, [user, cartProducts, prevCart]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const prevUser = usePrevious(user);
  useEffect(() => {
    const addToCartProducts = (savedCart, dbInventory) => {
      const newCart = [...cartProducts];
      for (const product of savedCart) {
        const totalQuantity = dbInventory[product.sku][product.size];
        if (!totalQuantity) {
          alert(
            `${product.title} is unavailable and has been removed from cart.`
          );
          continue; // don't push to cart if inventory is 0
        } else if (product.quantity > totalQuantity && totalQuantity) {
          alert(
            `${product.title} is no longer fully available. Quantity adjusted to ${totalQuantity}.`
          );
          product.quantity = totalQuantity;
        }

        let alreadyInCart = false;
        for (let i = 0; i < newCart.length; i++) {
          const existing = newCart[i];
          if (existing.sku === product.sku && existing.size === product.size) {
            alreadyInCart = true;
            if (existing.quantity + product.quantity > totalQuantity) {
              alert(
                `Requested quantity of ${product.title} exceeds available stock. Max stock added to cart.`
              );
              existing.quantity = totalQuantity;
            } else {
              existing.quantity += product.quantity;
            }
            break;
          }
        }
        if (!alreadyInCart) {
          newCart.push(product); // push product if not in newCart
        }
      }
      return newCart;
    };

    if (!prevUser && user) {
      // On Google login only
      db.once("value", snap => {
        const dbInventory = snap.val();
        db.child(`carts/${user.uid}`)
          .once("value")
          .then(snap => {
            const shoppingCart = snap.val();
            if (shoppingCart) {
              const newCart = addToCartProducts(shoppingCart, dbInventory);
              setCartProducts(newCart);
            }
          });
      });
    }
  }, [user, prevUser, cartProducts]);

  return (
    <MainContext.Provider
      value={{ user, cartProducts, setCartProducts, inventory }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainProvider;
