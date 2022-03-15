import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { useContext } from "react";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);

  // const [products] = state.productsAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const addCart = state.UserAPI.addCart;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;

  return (
    <div>
      {isAdmin ? (
        <>
          <div className="row_btn">
            <Link
              id="btn_buy"
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.images.public_id)
              }
              callback={callback}
            >
              Delete
            </Link>

            <Link id="btn_view" to={`/edit_product/${product._id}`}>
              Edit
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="row_btn">
            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
              Buy
            </Link>

            <Link id="btn_view" to={`/detail/${product._id}`}>
              View
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default BtnRender;
