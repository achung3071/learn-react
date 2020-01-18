import React, { useContext } from "react";
import { Drawer, Button } from "antd";
import { CartContext } from "../contexts/CartContext";
import CartProduct from "./CartProduct";

const Cart = ({ state }) => {
  const { cartVisible, setCartVisible } = state;
  const { cartProducts } = useContext(CartContext);
  const total = cartProducts.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0
  );
  return (
    <div style={{ textAlign: "right" }}>
      <Button onClick={() => setCartVisible(true)} icon="menu" />
      <Drawer onClose={() => setCartVisible(false)} visible={cartVisible}>
        {cartProducts.map((product, i) => (
          <CartProduct key={i} product={product} />
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
      </Drawer>
    </div>
  );
};

export default Cart;
