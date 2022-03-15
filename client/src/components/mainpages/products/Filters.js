import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);

  const [categories] = state.CategoryAPI.categories;

  const [products, setProducts] = state.productsAPI.products;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [result, setResult] = state.productsAPI.result;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch('')
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" id={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => {
            return (
              <option value={"category=" + category._id} key={category._id}>
                {" "}
                {category.name}{" "}
              </option>
            );
          })}
        </select>
      </div>

        

      <input type="text" value={search} placeholder="Enter your Search"  onChange={e => setSearch(e.target.value.toLocaleLowerCase())} />

      <div className="row">
        <span>Sort By: </span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">PriceL Low-High</option>
        </select>
      </div>

    </div>
  );
}

export default Filters;
