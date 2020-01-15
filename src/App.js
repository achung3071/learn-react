import React, { useEffect, useState, Fragment } from "react";
import "antd/dist/antd.css";
import Cart from "./components/Cart";
import ProductTable from "./components/ProductTable";
import SizeChart from "./components/SizeChart";

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
    <Fragment>
      <Cart />
      <SizeChart />
      <ProductTable products={products} />
    </Fragment>
  );
};

export default App;
