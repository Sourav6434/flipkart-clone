import React, { useEffect, useState } from "react";
import "../css/MyProfile.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  let token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;
          setUserId(id);
          const response = await axios.get(
            `http://localhost:4000/api/user/userdetails/${id}`
          );
          setUser(response.data);
        } else {
          setUserId(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="m-profile">
      <div className="m-profile-sidebar">
        <div className="m-profile-head">
          {user.gender === "male" ? (
            <div className="m-profile-image">
              <img src={process.env.PUBLIC_URL + "maleuser.png"} alt="image" />
            </div>
          ) : (
            <div className="m-profile-image">
              <img
                src={process.env.PUBLIC_URL + "femaleuser.png"}
                alt="image"
              />
            </div>
          )}

          <div className="m-profile-name">
            <p>Hola,</p>
            <p>{user.name}</p>
          </div>
        </div>
        <div className="m-profile-action">
          <div className="m-profile-action-myorders">
            <p>
              <i className="fa fa-archive" aria-hidden="true"></i>{" "}
              <NavLink to="/orders">MY ORDERS</NavLink>
            </p>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div className=" m-profile-action-setting">
            <p>
              <i className="fa fa-user-md" aria-hidden="true"></i>ACCOUNT
              SETTINGS
            </p>
            <div className="m-profile-action-setting-div">
              <p>
                <NavLink to="/myprofile">Profile Information</NavLink>
              </p>
              <p>
                <NavLink to="/myprofile/address">Manage Address</NavLink>
              </p>
            </div>
          </div>
          <div className="m-profile-action-setting-payment">
            <p>
              <i className="fa fa-credit-card" aria-hidden="true"></i>PAYMENT
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default MyProfile;
