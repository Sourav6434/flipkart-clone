const express = require('express');
const cartRouter = express.Router();

const cartController = require("../controllers/cartController");

cartRouter.get("/:userId", cartController.getAllCart);
cartRouter.put("/remove/:userId", cartController.removeFromCart);
cartRouter.put("/update/:userId", cartController.updateCartQuantity);
cartRouter.post("/:userId", cartController.addToCart);
module.exports = cartRouter;