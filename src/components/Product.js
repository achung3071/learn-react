import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button } from "antd";

const Product = ({ product }) => {
  const [inventory, setInventory] = useState({
    S: 2,
    M: 2,
    L: 2,
    XL: 2
  });
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const addToCart = size => {
    const newInventory = { ...inventory };
    newInventory[size]--;
    setInventory(newInventory);
    for (let i = 0; i < cartProducts.length; i++) {
      if (
        cartProducts[i].sku === product.sku &&
        cartProducts[i].size === size
      ) {
        const newCartProducts = [...cartProducts];
        newCartProducts[i].quantity++;
        return setCartProducts(newCartProducts);
      }
    }
    setCartProducts([...cartProducts, { ...product, size, quantity: 1 }]);
  };
  return (
    <div>
      <img src={`data/products/${product.sku}_1.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
      {["S", "M", "L", "XL"].map((size, i) => {
        const disabled = inventory[size] ? false : true;
        return (
          <Button
            key={i}
            type="primary"
            onClick={() => addToCart(size)}
            disabled={disabled}
          >
            {size}
          </Button>
        );
      })}
    </div>
  );
};

export default Product;
