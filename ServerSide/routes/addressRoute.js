const express = require("express");
const addressRouter = express.Router();

const addressController = require("../controllers/addressController");

addressRouter.get(
  "/0/:userId/:deliveryAddressId",
  addressController.getDeliveryAddress
);
addressRouter.get("/:userId", addressController.getAllAddresses);
addressRouter.get("/:userId/:addressId", addressController.getAddressById);
addressRouter.post("/:userId", addressController.createAddress);
addressRouter.put("/:userId/:addressId", addressController.updateAddress);
addressRouter.put(
  "/5/:userId/:addressId",
  addressController.updateDeliveryAddress
);
addressRouter.delete("/6/:userId/:addressId", addressController.deleteAddress);

module.exports = addressRouter;
