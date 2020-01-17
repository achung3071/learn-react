import React, { useContext } from "react";
import { Button } from "antd";
import { CartContext } from "../contexts/CartContext";
import { InventoryContext } from "../contexts/InventoryContext";

const CartProduct = ({ product }) => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { inventory, setInventory } = useContext(InventoryContext);

  const increment = () => {
    const newInventory = { ...inventory };
    newInventory[product.sku][product.size]--;
    setInventory(newInventory);
    const newCartProducts = [...cartProducts];
    const productIndex = cartProducts.indexOf(product);
    newCartProducts[productIndex].quantity++;
    setCartProducts(newCartProducts);
  };

  const decrement = () => {
    const newInventory = { ...inventory };
    newInventory[product.sku][product.size]++;
    setInventory(newInventory);
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
