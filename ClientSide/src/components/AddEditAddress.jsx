import React, { useState } from "react";
import "../css/Address.css";
// import "../css/AddEdit.css";
import { NavLink } from "react-router-dom";

const AddEditAddress = ({ closeAddress, handleSubmit, title, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <>
      <div className="address-bg">
        <div className="address-container">
          <form onSubmit={handleFormSubmit} className="address-form">
            <div className="header">
              <div className="page-header">
                <h2>{title}</h2>
              </div>
            </div>

            <hr />
            <div>
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name || ""}
                onChange={handleChange}
                required
                maxLength={30}
              />
            </div>
            <div>
              <label className="form-label">Phone:</label>
              <input
                type="number"
                name="phone"
                className="form-control"
                value={formData.phone || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label">House:</label>
              <input
                type="text"
                name="house"
                className="form-control"
                value={formData.house || ""}
                onChange={handleChange}
                required
                maxLength={150}
              />
            </div>
            <div>
              <label className="form-label">City:</label>
              <input
                className="form-control"
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                required
                maxLength={20}
              />
            </div>
            <div>
              <label className="form-label">State:</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state || ""}
                onChange={handleChange}
                required
                maxLength={15}
              />
            </div>
            <div>
              <label className="form-label">Landmark:</label>
              <input
                type="text"
                name="landmark"
                className="form-control"
                value={formData.landmark || ""}
                onChange={handleChange}
                required
                maxLength={60}
              />
            </div>
            <div>
              <label className="form-label">Pincode:</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                value={formData.pincode || null}
                onChange={handleChange}
                required
                minLength={6}
                maxLength={6}
              />
            </div>
            <div>
              <label>Type of address :</label>
              <div style={{ display: "flex", marginTop: "2%" }}>
                <input
                  className="type"
                  type="radio"
                  id="home"
                  name="type"
                  value="Home"
                  checked={formData.type === "Home"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="home">Home</label>
                <input
                  className="type"
                  type="radio"
                  id="work"
                  name="type"
                  value="Work"
                  checked={formData.type === "Work"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="work">Work</label>
              </div>
            </div>

            <div className="add-cancel-button">
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                  marginTop: "2%",
                }}
              >
                <button type="submit" className="add-update">
                  {title.includes("Edit") ? "Update Address" : "Add Address"}
                </button>
                <NavLink onClick={closeAddress}>
                  <button type="button" className="cancel">
                    Cancel
                  </button>
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditAddress;
