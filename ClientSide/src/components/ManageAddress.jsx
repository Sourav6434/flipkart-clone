import React, { useEffect, useRef, useState } from "react";
import "../css/ManageAddress.css";
import { NavLink } from "react-router-dom";
import AddEditAddress from "./AddEditAddress";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteAlert from "./DeleteAlert";

const ManageAddress = () => {
  const [isAddress, setIsAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [userId, setUserId] = useState();
  const [editAddress, setEditAddress] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [pId, setpId] = useState();
  const Menus = ["Edit", "Delete"];

  let token = localStorage.getItem("token");
  const closeAddress = () => {
    setIsAddress(false);
    setEditAddress(null);
  };

  const fetchAddresses = async () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;
        setUserId(id);
        const response = await axios.get(
          `http://localhost:4000/api/address/${id}`
        );
        setAddress(response.data.address);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error("Error fetching User Address:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editAddress) {
        // Update existing address
        await axios.put(
          `http://localhost:4000/api/address/${userId}/${editAddress._id}`,
          formData
        );
        setEditAddress(null);
      } else {
        // Add new address
        await axios.post(
          `http://localhost:4000/api/address/${userId}`,
          formData
        );
      }
      // Refresh addresses
      fetchAddresses();
      closeAddress();
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setIsAddress(true);
  };
  const handleOnDelete = async (addressId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/address/6/${userId}/${addressId}`
      );
      fetchAddresses();
      setOpenAlert(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="a-profile-view">
      <div className="add-new-address">
        <NavLink onClick={() => setIsAddress(true)}>
          + Add a new Address
        </NavLink>
      </div>
      {isAddress && (
        <AddEditAddress
          closeAddress={closeAddress}
          handleSubmit={handleSubmit}
          title={editAddress ? "Edit Address" : "Add New Address"}
          initialData={editAddress || {}}
        />
      )}
      <div className="saved-address">
        <p>{address && address.length} SAVED ADDRESSES</p>
      </div>
      {address && address.length > 0 ? (
        address.map((data, index) => (
          <div className="address" key={index}>
            <div className="address-head">
              <div>
                <div className="name-address">
                  <p>{data.name}</p>
                </div>
                <div className="type-address">
                  <p>{data.type}</p>
                </div>
              </div>

              <div className="option-address">
                <i
                  className="fa fa-ellipsis-v"
                  aria-hidden="true"
                  onClick={() =>
                    setOpenMenu(openMenu === data._id ? null : data._id)
                  }
                ></i>
                {openMenu === data._id && (
                  <div className="option-address-menus">
                    <NavLink
                      onClick={() => {
                        handleEditAddress(data);
                        setOpenMenu(null);
                      }}
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      onClick={() => {
                        setOpenAlert(true);
                        setpId(data._id);
                      }}
                    >
                      Delete
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            <div className="address-body">
              <p>
                {data.house}, {data.landmark},{data.city}, {data.state},{" "}
                {data.pincode}
              </p>
            </div>
            <div className="address-footer">
              <p>{data.phone}</p>
            </div>
            {openAlert && (
              <DeleteAlert
                handleOnDelete={() => handleOnDelete(pId)}
                setOpenAlert={setOpenAlert}
                headMessage={"Item"}
                bodyMessage={"Remove this Address"}
              />
            )}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default ManageAddress;
