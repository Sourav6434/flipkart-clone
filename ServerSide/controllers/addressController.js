const Address = require("../models/addressModel");
const userModel = require("../models/userModel");

// Controller for creating a new address
exports.createAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name,
      phone,
      house,
      city,
      state,
      landmark,
      pincode,
      type,
      isDeliveryAddress,
    } = req.body;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if address data is provided
    if (
      !name ||
      !phone ||
      !house ||
      !city ||
      !state ||
      !landmark ||
      !pincode ||
      !type
    ) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }

    let userAddressData = await Address.findOne({
      userId: userId,
    });

    if (!userAddressData) {
      userAddressData = new Address({ userId });
    }

    userAddressData.addresses.push({
      name,
      phone,
      house,
      city,
      state,
      landmark,
      pincode,
      type,
      isDeliveryAddress,
    });

    await userAddressData.save();

    res.status(201).json(userAddressData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all addresses of a specific user
exports.getAllAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddresses = await Address.findOne({ userId });

    if (!userAddresses || userAddresses.length === 0) {
      return res
        .status(404)
        .json({ message: "Addresses not found for this user" });
    }

    res.status(200).json(userAddresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a specific address of a specific user
exports.getAddressById = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddresses = await Address.findOne({ userId });

    if (!userAddresses || userAddresses.length === 0) {
      return res
        .status(404)
        .json({ message: "Addresses not found for this User" });
    }

    // Find the specific address by addressId
    const address = userAddresses.addresses.find(
      (addr) => addr._id.toString() === addressId
    );

    if (!address) {
      return res.status(404).json({ message: "This Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating an address of a specific user
exports.updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddressData = req.body;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found in Address" });
    }

    //id() Method: Mongoose provides a convenient method called id() to retrieve a subdocument from an array by its _id.
    const address = userAddress.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, updatedAddressData);

    await userAddress.save();

    res.status(200).json(userAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting an address of a specific user
exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = userAddress.addresses.findIndex(
      (addr) => addr._id == addressId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    userAddress.addresses.splice(index, 1);
    await userAddress.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update delivery address
exports.updateDeliveryAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's addresses
    const userAddress = await Address.findOne({ userId });
    if (!userAddress) {
      return res.status(404).json({ message: "User Address not found" });
    }

    // Find the address to mark as delivery address
    const addressToUpdate = userAddress.addresses.id(addressId);
    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Reset isDeliveryAddress for the previous delivery address if any
    const previousDeliveryAddress = userAddress.addresses.find(
      (addr) => addr.isDeliveryAddress
    );
    if (previousDeliveryAddress) {
      previousDeliveryAddress.isDeliveryAddress = false;
    }

    // Update the deliveryAddress field with the new addressId
    userAddress.deliveryAddress = addressId;

    // Mark the selected address as the delivery address
    addressToUpdate.isDeliveryAddress = true;

    // Save the updated userAddress
    await userAddress.save();

    res.status(200).json({ message: "Delivery Address updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
