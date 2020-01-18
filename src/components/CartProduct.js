import React, { useContext } from "react";
import { Button } from "antd";
import { MainContext } from "../contexts/MainContext";

const CartProduct = ({ product }) => {
  const { inventory, cartProducts, setCartProducts } = useContext(MainContext);

  const increment = () => {
    const newCartProducts = [...cartProducts];
    const productIndex = cartProducts.indexOf(product);
    newCartProducts[productIndex].quantity++;
    setCartProducts(newCartProducts);
  };

  const decrement = () => {
    const newCartProducts = [...cartProducts];
    const productIndex = cartProducts.indexOf(product);
    newCartProducts[productIndex].quantity--;
    if (!newCartProducts[productIndex].quantity) {
      newCartProducts.splice(productIndex, 1);
    }
    setCartProducts(newCartProducts);
  };

  return (
    <div>
      <img src={`data/products/${product.sku}_2.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price.toFixed(2)}</p>
      <p>Size: {product.size}</p>
      <span>Quantity: {product.quantity}</span>
      <Button
        icon="plus"
        onClick={increment}
        disabled={!inventory[product.sku][product.size]}
      />
      <Button icon="minus" onClick={decrement} />
      {product.isFreeShipping && <p>Free Shipping</p>}
    </div>
  );
};

export default CartProduct;
