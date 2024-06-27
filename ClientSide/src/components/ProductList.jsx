import React, { useEffect, useState } from "react";
import axios from "axios";
import ".././css/ProductList.css";
import { NavLink, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import CategoryList from "./CategoryList";

const ProductList = () => {
  const { category } = useParams();
  let token = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  const [product, setProduct] = useState([
    {
      id: null,
      title: "",
      description: "",
      price: null,
      discountPercentage: null,
      rating: null,
      stock: null,
      brand: "",
      category: "",
      subcategories: [""],
      thumbnail: "",
      images: [""],
    },
  ]);

  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/category?q=${encodeURIComponent(
            category
          )}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching Product Data: ${error}`);
      }
    };

    fetchLatestProduct();
  }, [category]);

  const handleOnClickAddToCart = async (productID) => {
    const response = await axios.post(
      `http://localhost:4000/api/cart/${decodedToken.id}`,
      {
        cartItem: productID,
      }
    );
    toast.success(response.data.message, { autoClose: 900 });
  };

  const handleWishlist = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/wishlist/${decodedToken.id}`,
        {
          wishlistItem: productId,
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="products">
        <CategoryList />
        {product && product.length > 0 ? (
          <div className="product-list">
            <div className="product-filter"></div>
            <div className="product-data">
              {product.map((data, index) => (
                <div className="product-card" key={index}>
                  <div className="product-image">
                    <NavLink
                      to={`/productDetails/${data._id}`}
                      style={{ color: "black" }}
                    >
                      <img src={data.thumbnail} alt="Image 1" />
                    </NavLink>
                    {decodedToken && decodedToken.name ? (
                      <i
                        className="fas fa-thin fa-heart"
                        title="Add to Wishlist"
                        onClick={() => handleWishlist(data._id)}
                      ></i>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="product-details">
                    <div></div>
                    <div>
                      <NavLink
                        to={`/productDetails/${data._id}`}
                        style={{ color: "black" }}
                      >
                        {" "}
                        <h2>{data.title}</h2>{" "}
                      </NavLink>
                      <button>
                        {data.rating} <i class="fas fa-duotone fa-star"></i>{" "}
                      </button>
                      <li>Brand: {data.brand}</li>
                      <li>Description: {data.description}</li>
                      <li>Category: {data.category}</li>
                    </div>
                  </div>

                  <div className="product-price">
                    <div className="product-price-details">
                      {" "}
                      <p>${data.price}</p>
                      <span className="product-list-discount">
                        <s>
                          $
                          {(
                            (100 * data.price) /
                            (100 - data.discountPercentage)
                          ).toFixed(2)}
                        </s>

                        <p>
                          <i class="fa-solid fa-arrow-down"></i>
                          {data.discountPercentage}% off
                        </p>
                      </span>
                      <p>save extra with offers</p>
                      {data.stock < 10 ? <p>Only {+data.stock} left</p> : null}
                    </div>

                    <div className="product-price-action">
                      <button onClick={() => handleOnClickAddToCart(data._id)}>
                        Add to Cart
                      </button>
                      <button>
                        <i class="fa fa-bolt" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/comingsoon.png"}
            alt="Product_Coming_soon_Image"
            className="comingsoon"
          />
        )}
      </div>
    </>
  );
};
export default ProductList;
