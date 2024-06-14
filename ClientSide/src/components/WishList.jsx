import React, { useEffect } from "react";
import "../css/WishList.css";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const WishList = () => {
  const [wishlistItem, setWishlistItem] = useState([]);
  const [userId, setUserId] = useState({});

  const fetchWishlistItem = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/wishlist/${userId}`
      );
      setWishlistItem(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleWishlist = async (userId, productId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/wishlist/${userId}`,
        {
          wishlistItem: productId,
          cart: false,
        }
      );
      toast.success(response.data.message);
      fetchWishlistItem(userId);
    } catch (err) {
      console.error(err);
    }
  };
  const handleOnClickAddToCart = async (userId, productID) => {
    const response = await axios.post(
      `http://localhost:4000/api/cart/${userId}`,
      {
        cartItem: productID,
      }
    );
    toast.success(response.data.message, { autoClose: 900 });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    let decodedToken;
    if (token) {
      decodedToken = jwtDecode(token);
    }
    setUserId(decodedToken.id);
    fetchWishlistItem(decodedToken.id);
  }, []);

  return (
    <div className="wishlist-root">
      <div className="wishlist-product-filter"></div>
      <div className="wishlist-product-list">
        {wishlistItem &&
          wishlistItem.length > 0 &&
          wishlistItem.map((data, key) => (
            <div className="wishlist-product-card">
              <div className="wishlist-product-card-icon">
                <i
                  className="fas fa-thin fa-heart"
                  title="Add or Remove to Wishlist"
                  onClick={() => handleWishlist(userId, data._id)}
                ></i>
              </div>
              <div className="wishlist-product-card-image">
                <NavLink
                  to={`/productDetails/${data._id}`}
                  style={{ color: "black" }}
                >
                  <img src={data.thumbnail} alt="Product Image" />
                </NavLink>
              </div>
              <div className="wishlist-product-card-details">
                <p>{data.title}</p>
                <p>
                  <i className="fa-solid fa-arrow-down"></i>
                  {data.discountPercentage}%
                  <del>
                    {(
                      (100 * data.price) /
                      (100 - data.discountPercentage)
                    ).toFixed(2)}
                  </del>{" "}
                  <strong>${data.price}</strong>
                </p>
              </div>
              <div className="wishlist-product-card-button">
                <button
                  onClick={() => handleOnClickAddToCart(userId, data._id)}
                >
                  Add to Cart
                </button>
                <button>
                  {" "}
                  <i class="fa fa-bolt" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WishList;
