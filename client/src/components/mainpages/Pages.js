import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import DetailProduct from "../mainpages/detailProduct/DetailProduct";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/NotFound";
import createProduct from "./createProduct/CreateProduct";

import { GlobalState } from "../../GlobalState";
import OrderHistory from "./history/OrderHistory";
import Categories from "./categories/Categories";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/detail/:id" exact component={DetailProduct} />
        <Route path="/login" exact component={isLogged ? NotFound : Login} />
        <Route
          path="/register"
          exact
          component={isLogged ? NotFound : Register}
        />
        <Route
          path="/category"
          exact
          component={isAdmin ? Categories : NotFound}
        />
        <Route
          path="/create_product"
          exact
          component={isAdmin ? createProduct : NotFound}
        />
        <Route
          path="/edit_product/:id"
          exact
          component={isAdmin ? createProduct : NotFound}
        />
        <Route
          path="/history"
          exact
          component={isLogged ? OrderHistory : NotFound}
        />
        <Route
          path="/history/:id"
          exact
          component={isLogged ? OrderDetails : NotFound}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default Pages;
