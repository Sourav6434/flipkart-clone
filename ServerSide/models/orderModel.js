const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  product: {
    type: Object,
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    orderItems: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0 },
    paymentMode: {
      type: String,
      enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"],
      required: true,
    },
    deliveryAddress: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
