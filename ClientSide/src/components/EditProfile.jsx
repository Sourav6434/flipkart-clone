import React, { useEffect, useState } from "react";
import "../css/MyProfile.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router";
import MyProfile from "./MyProfile";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [originaluser, setoriginaluser] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

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
        setoriginaluser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleChange = (event) => {
    const newuser = { ...user };
    newuser[event.target.name] = event.target.value;
    setUser(newuser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the data is modified
      const isDataModified =
        user.name !== originaluser.name ||
        user.email !== originaluser.email ||
        user.gender !== originaluser.gender;

      if (isDataModified) {
        const response = await axios.put(
          `http://localhost:4000/api/user/details/update/${userId}`,
          user
        );
        fetchData(userId);
        setEdit(false);
        navigate("/myprofile");
      } else {
        toast.error("Update atleast any one filed.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="m-profile-view">
      {edit ? (
        <form onSubmit={handleSubmit}>
          {}
          <div className="m-profile-view-name">
            <div>
              <p>Personal Information</p>
              <input
                type="name"
                className="contact-name"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <button>SAVE</button>
              <button onClick={() => setEdit(false)}>CANCEL</button>
            </div>
          </div>

          <div className="m-profile-view-gender">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={user.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={user.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={user.gender === "other"}
              onChange={handleChange}
            />
            <label htmlFor="other">Other</label>
          </div>

          <div className="m-profile-view-contact">
            <div>
              <p>Account Information</p>
            </div>
            <div>
              <input
                type="email"
                className="contact-email"
                id="email"
                name="email"
                value={user.email}
                placeholder="Email id"
                required
                onChange={handleChange}
              />
              <input
                type="phone"
                className="contact-phone"
                id="phone"
                name="phone"
                value={user.phone}
                placeholder="mobile no"
                disabled
                readOnly
              />
            </div>
          </div>
        </form>
      ) : (
        <>
          {}
          <div className="m-profile-view-name">
            <div>
              <p>Personal Information</p>
              <input
                type="name"
                className="contact-name"
                id="name"
                name="name"
                value={user.name}
                disabled
              />
            </div>
            <div>
              <button onClick={() => setEdit(true)}>Edit</button>
            </div>
          </div>

          <div className="m-profile-view-gender">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={user.gender === "male"}
              disabled
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={user.gender === "female"}
              disabled
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={user.gender === "other"}
              disabled
            />
            <label htmlFor="other">Other</label>
          </div>

          <div className="m-profile-view-contact">
            <div>
              <p>Account Information</p>
            </div>
            <div>
              <input
                type="email"
                className="contact-email"
                id="email"
                name="email"
                value={user.email}
                placeholder="Email id"
                disabled
              />
              <input
                type="phone"
                className="contact-phone"
                id="phone"
                name="phone"
                value={user.phone}
                placeholder="mobile no"
                disabled
              />
            </div>
          </div>
        </>
      )}

      <div className="faq">
        <h3>FAQs</h3>
        <p1 className="faq-qus">How to update profile information?</p1>
        <p>
          Click on the Edit button, then you can able to change the details and
          after changing click on the Save button.
        </p>
        <p1 className="faq-qus">How to update registered mobile number?</p1>
        <p>
          Currently due to security reason we are not providing the feature to
          update mobile number, you can use flipkart by registering with new
          number.
        </p>
        <p1 className="faq-qus">How to change the address details?</p1>
        <p>
          To add or Edit the address information you can click on Manage Address
          and you will be able to change or add new the addresses.
        </p>
        <p1 className="faq-qus">How to Deactivate my current account?</p1>
        <p>
          If you want to deactivate the flipkart account you can click on the
          deactivate button just below this page.
        </p>
      </div>
      <div className="deactivate">
        <p>Deactivate account</p>
      </div>
    </div>
  );
};
export default EditProfile;
