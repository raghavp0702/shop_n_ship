import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../../components/mainpages/utils/productItem/ProductItem";
import Loading from "../../../components/mainpages/utils/loading/Loading";
import axios from "axios";
import Filters from './Filters'
import LoadMore from "./LoadMore";


function Products() {
  const state = useContext(GlobalState);

  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);


  const handleCheck = (id) => {
    products.forEach((product)=>{
      if(product._id === id)
      {
        product.checked = !product.checked;
      }
    })
    setProducts([...products])
  };
  const deleteProduct = async (id, public_id) => {
    // console.log({id, public_id});
    try {
      setLoading(true);
      const destroyImg = await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if(loading)
  {
    return <div className="products">
      <Loading />
    </div>
  }

  const checkAll = ()=>{
    products.forEach(product=>{
      product.checked = !product.checked
    })
    setProducts([...products])

    setIsCheck(!isCheck)
  }

  const deleteAll = async ()=>{
    products.forEach(product =>{
      if(product.checked) deleteProduct(product._id, product.public_id)
    })
  }

  return (
    <>
    <Filters/>
    {
      isAdmin && <div className="delete-all">
        <span>Select all </span>
        <input type="checkbox" checked={isCheck} onChange={checkAll} />
        <button onClick={deleteAll} >Delete All</button>
      </div>
    }
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>

  );
}

export default Products;
