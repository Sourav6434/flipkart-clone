const express = require("express");
const userRouter = express.Router();

//import controller
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//define API routers
userRouter.post("/signup", authController.userSignUp);
userRouter.post("/login", authController.userlogin);

userRouter.delete("/delete/all", userController.deleteAllUser);
userRouter.delete("/:userId", userController.deleteUserById);

userRouter.put("/details/update/:userId", userController.updateUserDetails);

userRouter.get("/userdetails/:userId", userController.getUserById);

module.exports = userRouter;
