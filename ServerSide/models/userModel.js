const mongoose = require("mongoose");
const { Schema } = mongoose;
const Userschema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  gender: { type: String, required: true },
  phone: { type: String, require: true, minlength: 10, maxlength: 10 },
  role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
  active: { type: Boolean },
});

//This model will be use by the name: Users
module.exports = mongoose.model("Users", Userschema);
