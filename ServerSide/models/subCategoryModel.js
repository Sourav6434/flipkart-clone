const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategorySchema = new Schema(
  {
    name:{type:String, require:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
