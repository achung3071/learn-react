import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Product from "./Product";

const ProductTable = ({ setCartVisible }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setProducts(Object.values(json));
    };
    fetchProducts();
  }, []);

  return (
    <Row>
      {products.map((product, i) => (
        <Col key={i} sm={12} md={8} lg={6} style={{ border: "1px solid" }}>
          <Product setCartVisible={setCartVisible} product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductTable;
