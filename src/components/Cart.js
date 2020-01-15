import React, { useState } from "react";
import { Drawer, Button } from "antd";

const Cart = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ textAlign: "right" }}>
      <Button onClick={() => setVisible(true)} icon="menu" />
      <Drawer onClose={() => setVisible(false)} visible={visible} />
    </div>
  );
};

export default Cart;
