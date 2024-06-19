const Order = require("../models/orderModel");
const UserModel = require("../models/userModel");
const AddressModel = require("../models/addressModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderItems,
      totalPrice,
      totalDiscount,
      paymentMode,
      deliveryAddress,
    } = req.body;

    if (
      !userId ||
      !orderItems ||
      !totalPrice ||
      !totalDiscount ||
      !paymentMode ||
      !deliveryAddress
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the delivery address exists -- do the validation
    // if (!isdeliveryAddress) {
    //   return res.status(404).json({ message: "Delivery address not found." });
    // }

    const order = new Order({
      userId,
      orderItems,
      totalPrice,
      totalDiscount,
      paymentMode,
      deliveryAddress,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("orderItems.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
