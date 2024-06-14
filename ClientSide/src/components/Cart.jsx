import React, { useState } from "react";
import "../css/Cart.css";
import { toast } from "react-toastify";
import { UseSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";
import ShippingAddress from "./ShippingAddress";
import DeleteAlert from "./DeleteAlert";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totprice, setTotPrice] = useState(null);
  const [totsavings, setTotSavings] = useState(null);
  const deliverycharges = 40;
  const packagingcharges = 29;
  // const data = useSelector((state) => state.api.data);
  // console.log(data);

  const [changeShippingAddress, setChangeShippingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [pId, setpId] = useState(null);
  let token = localStorage.getItem("token");
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }

  useEffect(() => {
    fetchAddresses(decodedToken.id);
    fetchAllCart(decodedToken.id);
  }, []);

  const fetchAllCart = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/cart/${id}`);
      setCart(response.data);
      total(response.data);
    } catch (error) {
      console.error(`Error in fetching cart data: ${error}`);
    }
  };
  const total = (cart) => {
    let tempPrice = 0;
    let tempSaving = 0;
    cart.map((data, index) => {
      tempPrice = tempPrice + data.product.price * data.quantity;
      tempSaving =
        tempSaving +
        data.product.price *
          data.quantity *
          (data.product.discountPercentage / 100);
    });
    setTotPrice(tempPrice);
    setTotSavings(tempSaving.toFixed(2));
  };
  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/address/${userId}`
      );
      setAddresses(response.data.address);
      fetchDeliveryAddresses(decodedToken.id, response.data.deliveryAddress);
    } catch (err) {
      console.error(`Error in fetching shipping address: ${err}`);
    }
  };
  const fetchDeliveryAddresses = async (userId, addressId) => {
    try {
      const response = await axios.get(
        `
http://localhost:4000/api/address/0/${userId}/${addressId}`
      );
      setDeliveryAddress(response.data);
    } catch (err) {
      console.error(`Error in fetching shipping address: ${err}`);
    }
  };

  const handleWishlist = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/wishlist/${decodedToken.id}`,
        {
          wishlistItem: productId,
          cart: true,
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemoveOnClick = async (productID) => {
    const response = await axios.put(
      `http://localhost:4000/api/cart/remove/${decodedToken.id}`,
      {
        cartItem: productID,
      }
    );
    setOpenAlert(false);
    fetchAllCart(decodedToken.id);
    toast.success(response.data.message, { autoClose: 900 });
  };
  const handleBuyOnClick = () => {
    console.log("wishlist button clicked");
  };
  const handleDecrementOnClick = async (productID, quantity) => {
    if (quantity == 1) {
      toast.error("Minimum one quantity must be present", { autoClose: 700 });
    } else {
      const response = await axios.put(
        `http://localhost:4000/api/cart/update/${decodedToken.id}`,
        {
          cartItem: productID,
          action: false,
        }
      );
      fetchAllCart(decodedToken.id);
    }
  };
  const handleIncrementOnClick = async (productID, stock, quantity) => {
    try {
      if (quantity >= stock) {
        toast.error(`Only ${quantity} no of product is available`, {
          autoClose: 600,
        });
      } else {
        const response = await axios.put(
          `http://localhost:4000/api/cart/update/${decodedToken.id}`,
          {
            cartItem: productID,
            action: true,
          }
        );
        fetchAllCart(decodedToken.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeliveryAddressChange = async (addressId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/address/5/${decodedToken.id}/${addressId}`
      );
      fetchAddresses(decodedToken.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cart">
      {cart.length <= 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-image">
            <img src={process.env.PUBLIC_URL + "cart-empty.png"} alt="" />
          </div>
          <div className="empty-cart-message">
            <p>Your cart is empty!</p>
            <p>Explore our wide selection and find something you like</p>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-products">
            {cart.map((data, index) => (
              <div className="cart-card" key={index}>
                <div className="cart-card-details">
                  <div className="cart-card-image">
                    <NavLink
                      to={`/productDetails/${data.product._id}`}
                      style={{ color: "black" }}
                    >
                      {" "}
                      <img
                        src={
                          process.env.PUBLIC_URL + `${data.product.thumbnail}`
                        }
                        alt="product Images"
                      />{" "}
                    </NavLink>
                  </div>
                  <div className="cart-card-price">
                    <NavLink
                      to={`/productDetails/${data.product._id}`}
                      style={{ color: "black" }}
                    >
                      {" "}
                      <p>{data.product.title}</p>{" "}
                    </NavLink>

                    <p>Brand: {data.product.brand}</p>
                    <div className="product-discount">
                      <s>
                        $
                        {(
                          (100 * data.product.price) /
                          (100 - data.product.discountPercentage)
                        ).toFixed(2)}
                      </s>
                      <p
                        className="ccp-off"
                        style={{ marginLeft: 5, fontSize: 17 }}
                      >
                        <i class="fa-solid fa-arrow-down"></i>
                        {data.product.discountPercentage}% off
                      </p>
                    </div>
                    <p className="ccp-price">${data.product.price} Only</p>
                    <p className="ccp-offers">save extra with offers</p>
                    {data.product.stock < 10 ? (
                      <p>Only {+data.product.stock} left</p>
                    ) : null}
                  </div>
                  <div className="cart-card-delivery">
                    <p>
                      Delivery by Tomorrow | <s>40</s> <i>Free</i>
                    </p>
                  </div>
                </div>
                <div className="cart-card-action">
                  <div className="cart-card-count">
                    <button
                      onClick={() =>
                        handleDecrementOnClick(data.product._id, data.quantity)
                      }
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input type="number" value={data.quantity} readOnly />
                    <button
                      onClick={() =>
                        handleIncrementOnClick(
                          data.product._id,
                          data.product.stock,
                          data.quantity
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div className="cart-card-button">
                    <button onClick={() => handleWishlist(data.product._id)}>
                      Add to WishList
                    </button>
                    <button
                      onClick={() => {
                        setOpenAlert(true);
                        setpId(data.product._id);
                      }}
                    >
                      Remove
                    </button>
                    <button onClick={() => handleBuyOnClick(data.product._id)}>
                      <i className="fa fa-bolt"></i>Buy now
                    </button>
                  </div>
                </div>
                {openAlert && (
                  <DeleteAlert
                    handleOnDelete={() => handleRemoveOnClick(pId)}
                    setOpenAlert={setOpenAlert}
                    headMessage={"Item"}
                    bodyMessage={"Remove this Product from cart"}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="cart-total">
            <div className="cart-total-price">
              <div className="ctp-1">
                <p>PRICE DETAILS</p>
              </div>
              <div className="ctp-2">
                <div>
                  <p>Price</p>
                  <p>${totprice}</p>
                </div>
                <div>
                  <p>Delivery Charges</p>
                  <p>
                    <s>${deliverycharges}</s>FREE
                  </p>
                </div>
                <div>
                  <p>Packaging Charge</p>
                  <p>${packagingcharges}</p>
                </div>
                <div>
                  <p>Total Payable</p>
                  <p>${totprice + packagingcharges}</p>
                </div>
              </div>

              <div className="ctp-3">
                <p>Your Total saving on this order {totsavings}</p>
              </div>
            </div>
            <div className="cart-address-order">
              <div className="cart-header">
                <p>Shipping Address:</p>
                <div className="ca-2">
                  <NavLink
                    onClick={() => {
                      setChangeShippingAddress(true);
                    }}
                  >
                    change
                  </NavLink>
                </div>
              </div>
              <div className="cart-address">
                {deliveryAddress ? (
                  <div className="ca-1">
                    <p>
                      {deliveryAddress.name} {deliveryAddress.phone}
                    </p>
                    <p>
                      {deliveryAddress.house}, {deliveryAddress.city},{" "}
                      {deliveryAddress.landmark}
                    </p>
                    <p>
                      {deliveryAddress.state} - {deliveryAddress.pincode}
                    </p>
                  </div>
                ) : (
                  <div>Select or change delivery address 😊</div>
                )}

                {changeShippingAddress && (
                  <ShippingAddress
                    setChangeShippingAddress={setChangeShippingAddress}
                    addresses={addresses}
                    deliveryAddressId={deliveryAddress._id}
                    handleDeliveryAddressChange={handleDeliveryAddressChange}
                  />
                )}
              </div>
              <div className="place-order">
                <button>PLACE ORDER</button>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Cart;
