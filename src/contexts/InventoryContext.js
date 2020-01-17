import React, { createContext, useEffect, useState } from "react";

export const InventoryContext = createContext();

const InventoryProvider = props => {
  const [inventory, setInventory] = useState({});
  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("./data/inventory.json");
      const data = await response.json();
      setInventory(data);
    };
    fetchInventory();
  }, []);
  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
