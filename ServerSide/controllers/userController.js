const userModel = require("../models/userModel");

//getUserById
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch use Details",
      error: true,
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      userModel
        .findByIdAndUpdate(userId, updatedData)
        .then(
          res.status(200).json({ message: "Details updated successfully" })
        );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occurs while updating User Details",
      error: true,
    });
  }
};

//Delete all user
exports.deleteAllUser = async (req, res) => {
  try {
    await userModel
      .deleteMany()
      .then(
        res.status(200).json({ message: "All users deleted successfully" })
      );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to Delete",
      error: true,
    });
  }
};

//Delte User by Id
exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    await userModel
      .deleteOne({ _id: userId })
      .then(res.status(200).json({ message: "User deleted successfully" }));
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to Delete User By Id",
      error: true,
    });
  }
};
