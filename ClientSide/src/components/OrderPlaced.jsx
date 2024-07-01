import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/OrderPlaced.css";

const OrderPlaced = () => {
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <div className="order-placed">
      <div className="order-placedMessage">
        <p>Order Placed Successfully.</p>
        <p>
          <NavLink>view orders</NavLink>
        </p>
      </div>

      <div className="order-recent"></div>
    </div>
  );
};

export default OrderPlaced;
