import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoryAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const refresh = await axios.get("/user/refresh_token");

        setToken(refresh.data.accessToken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    UserAPI: UserAPI(token),
    CategoryAPI: CategoryAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
