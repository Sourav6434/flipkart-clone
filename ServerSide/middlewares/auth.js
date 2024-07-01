//auth
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authProtect = async (req, res, next) => {
  try {
    //extract JWT token
    let token, decode;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing: You are not logged in",
      });
    }

    //verify the token
    try {
      //verify function will give the data pass in token by verifying with the secret code
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    //Check if user still exists or not in database
    const freshUser = await User.findById(decode.id);

    if (!freshUser) {
      return res.status(401).json({
        success: false,
        message: "User belongs to this token dosen't exist",
      });
    }

    //Check if user changed after the JWT was issued  //future improvement

    //Grant Access to protected route
    req.user = freshUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //for restrict
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }
    //if pass restriction
    next();
  };
};
