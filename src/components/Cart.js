import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Drawer, Button } from "antd";
import { MainContext } from "../contexts/MainContext";
import CartProduct from "./CartProduct";

const db = firebase.database().ref();

const Cart = ({ state }) => {
  const { cartVisible, setCartVisible } = state;
  const { cartProducts, inventory, setCartProducts } = useContext(MainContext);
  const total = cartProducts.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0
  );

  const updateInventory = () => {
    // Update database inventory as current inventory on webpage
    db.update(inventory).then(() => setCartProducts([]));
  };

  return (
    <div style={{ textAlign: "right" }}>
      <Button onClick={() => setCartVisible(true)} icon="menu" size="large" />
      <Drawer onClose={() => setCartVisible(false)} visible={cartVisible}>
        {cartProducts.map((product, i) => (
          <CartProduct key={i} product={product} />
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
        <Button onClick={updateInventory}>Checkout</Button>
      </Drawer>
    </div>
  );
};

export default Cart;
