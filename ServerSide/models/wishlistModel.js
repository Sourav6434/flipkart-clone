const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");

const WishListShema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  wishlistedProductId: [
    { type: mongoose.Schema.Types.ObjectId, ref: ProductModel, required: true },
  ],
});

module.exports = mongoose.model("WishList", WishListShema);
