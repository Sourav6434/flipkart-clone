const express = require("express");
const userRouter = express.Router();

//import controller
const userController = require("../controllers/userController");
const { sendEmail } = require("../controllers/mailSend");

//define API routers
userRouter.post("/signup", userController.userSignUp);
userRouter.post("/login", userController.userlogin);
userRouter.post("/sendmail", sendEmail);

userRouter.delete("/delete/all", userController.deleteAllUser);
userRouter.delete("/:userId", userController.deleteUserById);

userRouter.put("/details/update/:userId", userController.updateUserDetails);

userRouter.get("/userdetails/:userId", userController.getUserById);

module.exports = userRouter;
