import React from "react";

const Product = ({ product }) => {
  console.log();
  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/data/products/${product.sku}_1.jpg`}
        alt=""
      ></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
    </div>
  );
};

export default Product;
