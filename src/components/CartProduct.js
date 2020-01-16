import React from "react";

const CartProduct = ({ product }) => {
  return (
    <div>
      <img src={`data/products/${product.sku}_2.jpg`} alt=""></img>
      <p>{product.title}</p>
      <p>{product.currencyFormat + product.price}</p>
      <p>Size: {product.size}</p>
      {product.isFreeShipping && <p>Free Shipping</p>}
    </div>
  );
};

export default CartProduct;
