import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button } from "antd";

const Product = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const addToCart = size => {
    setCartProducts([...cartProducts, { ...product, size }]);
  };
  return (
    <div>
      <img src={`data/products/${product.sku}_1.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
      {["S", "M", "L", "XL"].map((size, i) => (
        <Button key={i} type="primary" onClick={() => addToCart(size)}>
          {size}
        </Button>
      ))}
    </div>
  );
};

export default Product;
