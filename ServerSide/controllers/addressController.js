const Address = require("../models/addressModel");
const userModel = require("../models/userModel");

// Controller for creating a new address
exports.createAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressData = req.body;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userAddress = await Address.findOne({ userId: userId });

    if (!userAddress) {
      userAddress = new Address({ userId });
    }

    userAddress.address.push(addressData);

    await userAddress.save();

    res.status(201).json(userAddress);
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

    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userAddress);
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

    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = userAddress.address.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
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

    const address = userAddress.address.id(addressId);

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

    const index = userAddress.address.findIndex(
      (addr) => addr._id == addressId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    userAddress.address.splice(index, 1);
    await userAddress.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for fetching delivery address
exports.getDeliveryAddress = async (req, res) => {
  try {
    const { userId, deliveryAddressId } = req.params;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User Address not found" });
    }

    const address = userAddress.address.find(
      (addr) => addr._id.toString() === deliveryAddressId
    );

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update delivery address
exports.updateDeliveryAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User Address not found" });
    }

    const address = userAddress.address.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the deliveryAddress field with the new addressId
    userAddress.deliveryAddress = addressId;

    // Save the updated userAddress
    await userAddress.save();
    res.status(200).json({ message: "Delivery Address updated successfully" });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
