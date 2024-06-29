import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const CategoryListWithImage = () => {
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
    <div className="categories">
      {categories.map((data, index) => (
        <div className="cat-card" key={index}>
          <NavLink to={`/products/${encodeURIComponent(data.name)}`}>
            <img
              src={process.env.PUBLIC_URL + `${data.image}`}
              alt="Category Image"
            />
            <p>{data.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryListWithImage;
