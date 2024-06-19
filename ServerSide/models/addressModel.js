const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/userModel");

const AddressItemSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    house: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String, required: true },
    pincode: { type: Number, required: true },
    type: { type: String, required: true },
    isDeliveryAddress: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const AddressesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    addresses: [AddressItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Addresses", AddressesSchema);
