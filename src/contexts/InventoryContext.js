import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

const db = firebase.database().ref();
export const InventoryContext = createContext();

const InventoryProvider = props => {
  const [inventory, setInventory] = useState({});
  useEffect(() => {
    const handleData = snap => setInventory(snap.val());
    // When writing shopping carts to db, values are updated.
    // .on() will pull / reset inventory again: use .once() instead
    db.once("value", handleData, error => alert(error));
    return () => db.off("value", handleData);
  }, []);
  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
