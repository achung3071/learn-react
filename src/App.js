import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext";
import firebase from "firebase/app";
import "firebase/auth";
import InventoryProvider from "./contexts/InventoryContext";
import ProductTable from "./components/ProductTable";
import { StyledFirebaseAuth } from "react-firebaseui";

const App = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const authConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  return (
    <CartProvider user={user}>
      <InventoryProvider>
        {user ? (
          <div>
            <h1>Welcome, {user.displayName}</h1>
            <Button onClick={() => firebase.auth().signOut()}>Log Out</Button>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={authConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        <Cart state={{ cartVisible, setCartVisible }} />
        <ProductTable setCartVisible={setCartVisible} />
      </InventoryProvider>
    </CartProvider>
  );
};

export default App;
