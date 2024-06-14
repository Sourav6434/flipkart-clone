const mongoose = require("mongoose");
const { Schema } = mongoose;
const AddressSchema = new Schema({
  userId: { type: String, require: true },
  deliveryAddress: { type: String },
  address: [
    {
      name: { type: String, require: true },
      phone: { type: String, require: true },
      house: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      landmark: { type: String, require: true },
      pincode: { type: Number, require: true },
      type: { type: String, require: true },
    },
  ],
});

module.exports = mongoose.model("Addresses", AddressSchema);
