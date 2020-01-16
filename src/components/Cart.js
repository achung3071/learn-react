import React, { useState, useContext } from "react";
import { Drawer, Button } from "antd";
import { CartContext } from "../contexts/CartContext";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [visible, setVisible] = useState(false);
  const { cartProducts } = useContext(CartContext);
  return (
    <div style={{ textAlign: "right" }}>
      <Button onClick={() => setVisible(true)} icon="menu" />
      <Drawer onClose={() => setVisible(false)} visible={visible}>
        {cartProducts.map((product, i) => (
          <CartProduct key={i} product={product} />
        ))}
      </Drawer>
    </div>
  );
};

export default Cart;
