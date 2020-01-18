import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext";
import InventoryProvider from "./contexts/InventoryContext";
import ProductTable from "./components/ProductTable";

const App = () => {
  const [data, setData] = useState({});
  const [cartVisible, setCartVisible] = useState(false);
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <CartProvider>
      <InventoryProvider>
        <Cart state={{ cartVisible, setCartVisible }} />
        <ProductTable setCartVisible={setCartVisible} products={products} />
      </InventoryProvider>
    </CartProvider>
  );
};

export default App;
