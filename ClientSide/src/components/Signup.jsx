import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import "react-toastify/dist/ReactToastify.css";
import "../css/loginSignup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmpassword: "",
  });

  // Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    gender: Joi.string().required(),
    password: Joi.string().min(4).required(),
    confirmpassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords and confirm password must match" }),
  }).unknown(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    const validationResult = schema.validate(data, { abortEarly: false });
    if (validationResult.error) {
      validationResult.error.details.forEach((err) => {
        toast.error(`${err.message}.`);
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
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

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setData({
          name: "",
          email: "",
          gender: "",
          password: "",
          confirmpassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <div className="signup-container shadow">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            name="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={data.password}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Enter your password"
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
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              value={data.confirmpassword}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mobile number:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="mobile no"
            inputmode="numeric"
            minLength={10}
            maxLength={10}
            value={data.phone}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={data.gender} onChange={handleOnChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="btn-sign">Sign-up</button>
        <p>
          Already have an account?{" "}
          <NavLink to="/login" className="link">
            {" "}
            Login here
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
