import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "../css/ProductDetails.css";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import CategoryList from "./CategoryList";

const ProductDetails = () => {
  const [productData, SetProductData] = useState({
    title: "",
    description: "",
    price: null,
    discountPercentage: null,
    stock: null,
    brand: "",
    category: "",
    features: [],
    thumbnail: "",
    images: [],
  });
  const { id } = useParams();
  const [thumbImage, setThumbImage] = useState("");
  let token = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  // Fetching the user based on id
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/product/id/${id}`)
      .then((data) => {
        SetProductData(data.data);
        setThumbImage(data.data.thumbnail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleOnClickAddToCart = async (productID) => {
    try {
      if (!token) {
        toast.info("Please Login to you account", {
          toastId: "khandu",
          autoClose: 1000,
        });
      } else {
        console.log("userId ", decodedToken.id);
        const response = await axios.post(
          `http://localhost:4000/api/cart/${decodedToken.id}`,
          {
            cartItem: productID,
          }
        );
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleWishlist = async (productId) => {
    try {
      if (!token) {
        toast.info("Please Login to you account", {
          toastId: "khandu",
          autoClose: 1000,
        });
      } else {
        const response = await axios.put(
          `http://localhost:4000/api/wishlist/${decodedToken.id}`,
          {
            wishlistItem: productId,
          }
        );
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleOnBuyNow = async (productId) => {
    try {
      if (!token) {
        toast.info("Please Login to you account", {
          toastId: "khandu",
          autoClose: 1000,
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="products">
      <CategoryList />
      <div className="product-details-container">
        <div className="product-details-image">
          <div className="product-image1">
            <div className="images">
              {productData.images.map((data) => (
                <img
                  src={process.env.PUBLIC_URL + `${data}`}
                  alt="product Images"
                  onClick={() => setThumbImage(data)}
                />
              ))}
            </div>
            <div className="thumbnail">
              <img
                src={process.env.PUBLIC_URL + `${thumbImage}`}
                alt="product Images"
              />

              <i
                className="fas fa-thin fa-heart"
                title="Add to Wishlist"
                onClick={() => handleWishlist(productData._id)}
              ></i>
            </div>
          </div>
          <div className="product-button1">
            <button onClick={() => handleOnClickAddToCart(productData._id)}>
              Add to Cart
            </button>
            <button onClick={() => handleOnBuyNow(productData._id)}>
              {" "}
              <i class="fa fa-bolt" />
              Buy Now
            </button>
          </div>
        </div>
        <div className="product-details-content">
          <div className="route-history">
            <div></div>
            <div>
              <NavLink to={`/addProduct/${id}`}>
                <i className="fa fa-edit" title="Edit Details"></i>
              </NavLink>
            </div>
          </div>
          <div className="details-title-rating">
            <div className="product-price-t">
              <p>{productData.title}</p>
              <button>
                {productData.rating} <i class="fas fa-duotone fa-star"></i>{" "}
              </button>
              <p>Special Price</p>
            </div>
            <div className="product-price-disc">
              <h2>$ {productData.price} </h2>
              <s>
                $
                {(
                  (100 * productData.price) /
                  (100 - productData.discountPercentage)
                ).toFixed(2)}
              </s>

              <p>
                <i class="fa-solid fa-arrow-down"></i>
                {productData.discountPercentage}% off
              </p>
            </div>
            <p>Save extra with Bank offers</p>
          </div>
          <div className="details-data">
            <p>Brand: {productData.brand}</p>
            <p>Description: {productData.description}</p>
            <p>
              <i>Category: {productData.category}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
