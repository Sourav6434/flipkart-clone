import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const CategoryList = () => {
  const [categories, setCategories] = useState([{}]);
  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/category/all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error(`Error in fetching catgory data: ${error}`);
    }
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);
  return (
    <div className="product-categories">
      {categories.map((data, index) => (
        <NavLink to={`/products/${encodeURIComponent(data.name)}`}>
          {data.name}
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryList;
