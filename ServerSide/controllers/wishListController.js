const wishlistModel = require("../models/wishlistModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

//add wishlist
exports.updateWishlist = async (req, res) => {
  const userId = req.params.userId;
  const { wishlistItem, cart } = req.body;
  try {
    let isUserExist = await userModel.findOne({ _id: userId });
    if (!isUserExist) {
      return res.status(200).json({ message: "User not found" });
    }

    let wishlistData = await wishlistModel.findOne({ userId });
    if (isUserExist && !wishlistData) {
      wishlistData = new wishlistModel({ userId });
    }
    const productIndex = wishlistData.wishlistedProductId.indexOf(wishlistItem);
    if (productIndex !== -1) {
      // Product already exists in wishlist, and also in cart then show response message
      if (cart) {
        return res
          .status(200)
          .json({ message: "Product Already in the wishlist" });
      } else {
        wishlistData.wishlistedProductId.pull(wishlistItem);
        await wishlistData.save();
        return res
          .status(200)
          .json({ message: "Product removed from the wishlist" });
      }
      // Product already exists in wishlist, then remove it
    } else {
      // Product doesn't exist in wishlist, add it
      wishlistData.wishlistedProductId.push(wishlistItem);
      await wishlistData.save();
      return res.status(200).json({ message: "Product added to Wishlist" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: true,
    });
  }
};

//Get all bookmarks by userID
exports.getwishlistItems = async (req, res) => {
  const userId = req.params.userId;
  try {
    let isUserExist = await userModel.findOne({ _id: userId });
    if (!isUserExist) {
      return res.status(200).json({ message: "User not found" });
    }

    const userWishlist = await wishlistModel.findOne({ userId: userId });
    if (!userWishlist) {
      return res.status(404).json({ message: "Wishilist is empty" });
    }

    const wishlistedItem = await Promise.all(
      userWishlist.wishlistedProductId.map(async (pid) => {
        try {
          const response = await productModel.findById(pid);
          // console.log(response);
          return response;
        } catch (err) {
          console.log(err);
        }
      })
    );

    res.status(200).json(wishlistedItem);
  } catch (error) {
    console.error("Error fetching Wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
