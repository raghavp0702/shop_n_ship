import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/Menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);

  const [isAdmin] = state.UserAPI.isAdmin;
  const [isLogged] = state.UserAPI.isLogged;
  const [cart, setCart] = state.UserAPI.cart;
  const [menu, setMenu] = useState(false);


  const logoutHandler = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem('firstLogin');
    window.location.href = "/";
    alert("Logout success");
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history"> History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = ()=> setMenu(!menu)

  const styleMenu = {
    left: menu ? 0: '-100%'
  }

  return (
    <header>
      <div className="menu" onClick={()=> setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Shop N Ship"}</Link>
        </h1>
      </div>

      <ul style={styleMenu} >
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        <li onClick={()=> setMenu(!menu)} >
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
