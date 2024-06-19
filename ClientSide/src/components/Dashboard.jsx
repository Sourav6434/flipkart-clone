import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../css/DashBoard.css";
import CategoryListWithImage from "./CategoryListWithImage";

const Dashboard = () => {
  const [offers, setOffers] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/offer?lim=4"
        );
        setOffers(response.data);
      } catch (error) {
        console.error(`Error fetching Offers: ${error}`);
      }
    };
    const fetchLatestProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/product/getProduct?q=" + ""
        );
        console.log(response.data);
        setLatestProduct(response.data);
      } catch (error) {
        console.error(`Error fetching Product Data: ${error}`);
      }
    };
    fetchLatestProduct();
    fetchOffers();
  }, []);

  return (
    <>
      <div className="dash">
        <div className="dashboard">
          <CategoryListWithImage />
          <div className="offers">
            <div className="slider">
              <div className="slides">
                <img
                  src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
                  alt="Image 1"
                />
                <img src="https://cdn.dummyjson.com/product-images/6/thumbnail.png" />
                <img
                  src="https://cdn.dummyjson.com/product-images/9/thumbnail.jpg"
                  alt="Image 3"
                />
              </div>
            </div>
            <div className="slider-1">
              <div className="slider-card">
                {offers.map((offer, index) => (
                  <div className="card-offers" key={index}>
                    <p>
                      <strong> {offer.OfferTitle} </strong>
                    </p>
                    <p>Get Discount upto {offer.Discount}%</p>
                    <p>
                      <strong>Start Date: {offer.StartDate}</strong>
                    </p>
                  </div>
                ))}
              </div>
              <div className="slider-card-1">
                <NavLink to="/offers">Check all offers...</NavLink>
              </div>
            </div>
          </div>

          <div className="products">
            {latestProduct.slice(0, 16).map((product, index) => (
              <div className="card" key={index}>
                <NavLink to={`/productDetails/${product._id}`}>
                  <img src={product.thumbnail} alt="Product Image" />
                  <h4>{product.title}</h4>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
