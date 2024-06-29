import React from "react";
import "../css/order.css";
import { NavLink } from "react-router-dom";

const Order = () => {
  return (
    <div className="order-Container">
        <div className="order-address-order">
          <div className="address-header">
            <p>DELIVERY ADDRESS:</p>
            <div className="ca-2">
              <NavLink
              // onClick={() => {
              //   setChangeShippingAddress(true);
              // }}
              >
                {/* {deliveryAddress ? "change" : "select"} */}
              </NavLink>
            </div>
          </div>
          <div className="order-address">
            {/* {deliveryAddress ? ( */}
            <div className="o-1">
              <p>{"Aditi Pritam"} </p>
              <p>
                {"plot no 31"}, {"Airoli"}, {"Capgemini"}
              </p>
              <p>
                {"Maharastra"} - {"400701"}
              </p>
              <p>{"7250829977"}</p>
            </div>
            {/* ) : ( */}
            {/* <div>Delivery address not selected</div> */}
            {/* )} */}

            {/* {changeShippingAddress && (
                  <ShippingAddress
                    setChangeShippingAddress={setChangeShippingAddress}
                    addresses={addresses}
                    deliveryAddressId={
                      deliveryAddress ? deliveryAddress._id : null
                    }
                    handleDeliveryAddressChange={handleDeliveryAddressChange}
                  />
                )} */}
          </div>
        </div>
          {/* {cart.map((data, index) => ( */}
          <div
            className="order-card"
            //   key={index}
          >
            <div className="order-card-details">
              <div className="order-card-image">
                <NavLink
                //   to={`/productDetails/${data.product._id}`}
                //   style={{ color: "black" }}
                >
                  {" "}
                  <img
                    src={process.env.PUBLIC_URL + `${"/Grocery.png"}`}
                    alt="product Images"
                  />{" "}
                </NavLink>
              </div>
              <div className="order-card-price">
                <NavLink
                //   to={`/productDetails/${data.product._id}`}
                //   style={{ color: "black" }}
                >
                  {" "}
                  <p>{"Grocery"}</p>{" "}
                </NavLink>

                <p>Brand: {"Grocery"}</p>
                <div className="order-discount">
                  <s>${((100 * 500) / (100 - 20)).toFixed(2)}</s>
                  <p
                    className="ocp-off"
                    style={{ marginLeft: 5, fontSize: 17 }}
                  >
                    <i class="fa-solid fa-arrow-down"></i>
                    {80}% off
                  </p>
                </div>
                <p className="ocp-price">${300} Only</p>
                <p className="ocp-offers">save extra with offers</p>
                {/* {data.product.stock < 10 ? ( */}
                <p>Only {3} left</p>
                {/* ) : null} */}
              </div>
              <div className="order-card-delivery">
                <p>
                  Delivery by Tomorrow | <s>40</s> <i>Free</i>
                </p>
              </div>
            </div>
            <div className="order-card-action">
              <div className="order-card-count">
                <button
                //   onClick={() =>
                //     handleDecrementOnClick(data.product._id, data.quantity)
                //   }
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input type="number" value={2} readOnly />
                <button
                //   onClick={() =>
                //     handleIncrementOnClick(
                //       data.product._id,
                //       data.product.stock,
                //       data.quantity
                //     )
                //   }
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="order-card-button">
                {/* <button onClick={() => handleWishlist(data.product._id)}>
                      Add to WishList
                    </button> */}
                <button
                //   onClick={() => {
                //     setOpenAlert(true);
                //     setpId(data.product._id);
                //   }}
                >
                  Remove
                </button>
              </div>
            </div>
            {/* {openAlert && (
                  <DeleteAlert
                    handleOnDelete={() => handleRemoveOnClick(pId)}
                    setOpenAlert={setOpenAlert}
                    headMessage={"Item"}
                    bodyMessage={"Remove this Product from cart"}
                  />
                )} */}
          </div>
          {/* ))} */}
      <div className="order-infoContainer">
        <div className="order-info"></div>
        <div className="order-infoBtn">
          <button>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
