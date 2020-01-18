import React, { Fragment, useContext, useState } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import Cart from "./components/Cart";
import { MainContext } from "./contexts/MainContext";
import firebase from "firebase/app";
import "firebase/auth";
import ProductTable from "./components/ProductTable";
import { StyledFirebaseAuth } from "react-firebaseui";

const App = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const { user } = useContext(MainContext);

  const authConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default App;
