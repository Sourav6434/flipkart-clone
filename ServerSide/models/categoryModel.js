const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
