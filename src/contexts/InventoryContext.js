import React, { createContext, useEffect, useState } from "react";
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

export const InventoryContext = createContext();

const InventoryProvider = props => {
  const [inventory, setInventory] = useState({});
  useEffect(() => {
    const handleData = snap => setInventory(snap.val());
    db.on("value", handleData, error => alert(error));
    return () => db.off("value", handleData);
  }, []);
  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
