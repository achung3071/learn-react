import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext";
import ProductTable from "./components/ProductTable";

const App = () => {
  const [data, setData] = useState({});
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
      <Cart />
      <ProductTable products={products} />
    </CartProvider>
  );
};

export default App;
