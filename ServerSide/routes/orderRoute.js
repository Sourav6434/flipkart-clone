const express = require("express");
const orderRouter = express.Router();

const orderController = require("../controllers/orderController");

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/:id", orderController.getOrderDetailsById);
orderRouter.get("/all/:userId", orderController.getAllOrdersOfUser);

module.exports = orderRouter;
