const mongoose = require("mongoose");
const { Schema } = mongoose;
const Userschema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, require: true },
  active: { type: Boolean },
});

//This model will be use by the name: Users
module.exports = mongoose.model("Users", Userschema);
