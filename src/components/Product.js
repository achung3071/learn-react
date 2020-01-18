import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Button } from "antd";

const Product = ({ setCartVisible, product }) => {
  const { inventory, cartProducts, setCartProducts } = useContext(MainContext);

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
    setCartVisible(true);
  };

  const outOfStock =
    Object.keys(inventory).length &&
    !Object.values(inventory[product.sku]).reduce(
      (acc, quantity) => acc + quantity
    );

  return (
    <div>
      <img src={`data/products/${product.sku}_1.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price.toFixed(2)}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
      {outOfStock ? (
        <p>Out of Stock</p>
      ) : (
        ["S", "M", "L", "XL"].map((size, i) => {
          const disabled =
            Object.keys(inventory).length && !inventory[product.sku][size];
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
        })
      )}
    </div>
  );
};

export default Product;
