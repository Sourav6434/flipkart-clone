const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: { type: String, require: true },
    cart: [
      {
        product: { type: String, require: true },
        quantity: { type: Number, require: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
