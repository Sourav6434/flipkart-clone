import React, { useState } from "react";
import "../css/ShippingAddress.css";

const ShippingAddress = ({
  setChangeShippingAddress,
  addresses,
  deliveryAddressId,
  handleDeliveryAddressChange,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(
    deliveryAddressId || null
  );
  const handleOnChange = (addressId) => {
    console.log("handle on change", addressId);
    setSelectedAddressId(addressId);
    handleDeliveryAddressChange(addressId);
  };
  return (
    <div className="shipping-wrapper">
      <div className="shipping-address">
        <div className="shipping-address-top">
          <p>Change Shipping Address:</p>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => setChangeShippingAddress(false)}
          ></i>
        </div>
        {addresses && addresses.length ? (
          addresses.map((data, index) => (
            <div className="s-address" key={index}>
              <div className="s-button">
                <input
                  type="radio"
                  id={data._id}
                  value={data._id}
                  name="deliveryAddress"
                  checked={selectedAddressId === data._id}
                  onChange={() => handleOnChange(data._id)}
                ></input>
              </div>
              <div className="s-details">
                <div className="s-header">
                  <div className="s-header-name">
                    <p>{data.name}</p>
                  </div>
                  <div className="s-header-type">
                    <p>{data.type}</p>
                  </div>
                </div>
                <div className="s-data">
                  <p>
                    {data.house}, {data.landmark}, {data.state} - {data.pincode}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No saved Address</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
