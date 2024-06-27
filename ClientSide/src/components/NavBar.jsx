import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const data = useSelector((state) => state.api.data);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchProducts = async (value) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/search/any?q=" + value
      );
      setSearchData(response.data);
    } catch (error) {
      console.error(`Error fetching Products: ${error}`);
    }
  };

  function handleOnChange(value) {
    console.log("searchTerm " + value);
    if (value !== "") {
      setSearchTerm(value);
      if (value !== "") {
        fetchProducts(value);
      }
    }
    if (value === "") {
      setSearchTerm("");
      setSearchData([]);
    }
  }

  return (
    <div className="nav">
    <div className="navbar">
      <div className="nav-1">
        <div className="logo">
          <NavLink to="/" className="logo-link">
            <img
              src="/flipkart-logo.png"
              alt="Flipkart"
              className="logo-image"
            />
          </NavLink>
        </div>
        <div className="search-container1">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Products, Brands and more..."
              value={searchTerm}
              autoComplete="off"
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </div>
          <div className="search-result">
            {searchData.length > 0 &&
              searchData.map((data, index) => (
                <ul>
                  <li key={index}>
                    <div>
                      <NavLink to={`/productDetails/${data._id}`}>
                        <img
                          src={process.env.PUBLIC_URL + `${data.thumbnail}`}
                          alt="Product Image"
                        />
                        {data.title}
                      </NavLink>
                    </div>
                    <div>
                      <i>Category: {data.category}</i>
                    </div>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>

      <div className="nav-2">
        <div className="nav-login">
          {token ? (
            <div className="dropdown-menus">
              <button className="dropbtn">
                {" "}
                {data && token ? (
                  <> Welcome {data && data.name && data.name.split(" ")[0]} !</>
                ) : (
                  ""
                )}
                <i className="fa fa-caret-down"></i>
              </button>

              <div>
                <ul className="dropdown-content">
                  <NavLink to="/myprofile" className="my-profile">
                    <i
                      className="fas fa-user-edit"
                      style={{ marginRight: "5px" }}
                    ></i>
                    My Profile
                  </NavLink>

                  <NavLink to="/wishlist" className="my-profile" href="#">
                    <i
                      className="fa fa-solid fa-heart"
                      style={{ marginRight: "5px" }}
                    ></i>
                    My Wishlist
                  </NavLink>
                  <NavLink to="/orders" className="my-profile">
                    <i
                      className="fa fa-archive"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Your Orders
                  </NavLink>

                  <a className="logout-button" href="#" onClick={handleLogOut}>
                    <i
                      className="fa fa-sign-out"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Logout
                  </a>
                </ul>
              </div>
            </div>
          ) : (
            <div className="login-btn">
              {" "}
              <NavLink to="/login" className="login-buttons">
                <i
                  className="fa fa-sign-in"
                  style={{ marginRight: "9px" }}
                  aria-hidden="true"
                ></i>
                Login
              </NavLink>{" "}
            </div>
          )}
        </div>

        <div className="nav-icon">
          <NavLink to="/cart">
            <i className="fa-solid fa-cart-shopping" title="cart"></i>Cart
          </NavLink>
          <NavLink to="/addProduct">
            <i className="fa-brands fa-sellsy" title="Become a seller"></i>
            Become a Seller
          </NavLink>
          <i className="fa-solid fa-bars" title="more"></i>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
