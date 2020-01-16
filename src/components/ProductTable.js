import React from "react";
import { Row, Col } from "antd";
import Product from "./Product";

const ProductTable = ({ products }) => {
  return (
    <Row>
      {products.map((product, i) => (
        <Col key={i} sm={12} md={8} lg={6} style={{ border: "1px solid" }}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductTable;
