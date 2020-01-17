import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Button } from "antd";

const Product = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const getIndexInCart = size => {
    for (let i = 0; i < cartProducts.length; i++) {
      if (
        cartProducts[i].sku === product.sku &&
        cartProducts[i].size === size
      ) {
        return i;
      }
    }
    return false;
  };

  const addToCart = size => {
    const productIndex = getIndexInCart(size);
    if (productIndex !== false) {
      const newCartProducts = [...cartProducts];
      newCartProducts[productIndex].quantity++;
      setCartProducts(newCartProducts);
    } else {
      setCartProducts([...cartProducts, { ...product, size, quantity: 1 }]);
    }
  };

  return (
    <div>
      <img src={`data/products/${product.sku}_1.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price.toFixed(2)}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
      {["S", "M", "L", "XL"].map((size, i) => {
        return (
          <Button key={i} type="primary" onClick={() => addToCart(size)}>
            {size}
          </Button>
        );
      })}
    </div>
  );
};

export default Product;
