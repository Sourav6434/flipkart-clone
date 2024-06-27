const express = require("express");
const wishlistRouter = express.Router();

const wishlistController = require("../controllers/wishListController");
const { authProtect } = require("../middlewares/auth");

wishlistRouter.put("/:userId", wishlistController.updateWishlist);
wishlistRouter.get(
  "/:userId",
  authProtect,
  wishlistController.getwishlistItems
);

module.exports = wishlistRouter;
