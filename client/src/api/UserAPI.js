import axios from "axios";
import React, { useState, useEffect } from "react";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: {
              Authorization: token,
            },
          });
          setIsLogged(true);
          if (res.data.user.role === 1) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          setCart(res.data.user.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);



  const addCart = async (product) => {
    if (!isLogged) return alert(`Please login to add to cart`);

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addcart",
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      alert("This product is already in your cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
  };
}

export default UserAPI;
