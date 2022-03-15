import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";

function ProductItem({ product, isAdmin, handleCheck,deleteProduct}) {
 
  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" name="" checked={product.checked}
      onChange={()=> handleCheck(product._id)} />}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div> 
  );
}

export default ProductItem;
