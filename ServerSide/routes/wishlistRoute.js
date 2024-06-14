const express = require("express");
const wishlistRouter = express.Router();

const wishlistController = require("../controllers/wishListController");

wishlistRouter.put("/:userId", wishlistController.updateWishlist);
wishlistRouter.get("/:userId", wishlistController.getwishlistItems);

module.exports = wishlistRouter;
