import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Joi from "joi";
import "../css/loginSignup.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Joi schema for validation
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(4).required(),
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate data using Joi schema
    const validationResult = schema.validate(data);
    if (validationResult.error) {
      toast.error(validationResult.error.message);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResponse = await response.json();

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
      if (!dataResponse.success) {
        toast.error(dataResponse.message);
      }

      if (dataResponse.success) {
        if (localStorage.getItem("token")) {
          toast.success(localStorage.getItem("name") + " already logged in");
          navigate("/");
        } else {
          toast.success(dataResponse.message);
          localStorage.setItem("token", dataResponse.token);
          localStorage.setItem("userId", dataResponse.id);
          localStorage.setItem("name", dataResponse.name);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter your Email"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group ">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
            <span className="password-toggle-icon">
              <i
                className={`${
                  showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </span>
          </div>
        </div>
        <button type="submit" className="btn-sign">
          Login
        </button>
        <p>
          Don't have an account?
          <NavLink to="/signup" className="link">
            {" "}
            Sign up here
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
