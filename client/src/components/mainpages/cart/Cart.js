import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity++;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    }
    setCart([...cart]);
    addToCart(cart);
  };

  const tranSuccess = async (payment) => {
    // console.log(payment);

    const { paymentID, address } = payment;
    // console.log("before post call");
    await axios.post
    (
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );
    // console.log("after post call");

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order");
    // setCallback(!callback)
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</h2>
    );
  }

  return (
    <>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <h2></h2>
          <img src={product.images.url} alt="" className="img_container" />

          <div className="box-detail">
            <h2> {product.title} </h2>
            <span>$ {product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              {" "}
              X{" "}
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total : ${total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </>
  );
}
export default Cart;
