import React, { Component } from "react";
import "./App.css";
import HomePage from "./container/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./container/ProductListPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.actions";
import ProductDetailPage from "./container/ProductDetailPage";
import CartPage from "./container/CartPage";
import { updateCart } from "./actions/cart.actions";
import OrderPage from "./container/OderPage";
import OrderDetailsPage from "./container/OrderPageDetail";
import CheckoutPage from "./container/CheckoutPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  // useEffect(() => {
  //   console.log("App.js - updateCart");
  //   dispatch(updateCart());
  // }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId"
            component={ProductDetailPage}
          />
          <Route path="/:slug" exact component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
