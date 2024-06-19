const mongoose = require("mongoose");
//const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: { type: Number, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  discountPercentage: { type: Number, require: true },
  rating: { type: Number, require: true },
  stock: { type: Number, require: true },
  brand: { type: String, require: true },
  category: { type: String, require: true },
  subcategories: [{ type: String, require: true }],
  features: [
    {
      title: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  thumbnail: { type: String, require: true },
  images: [{ type: String }],
});

//Productschema.plugin(mongoose_fuzzy_searching, { fields: ['ProductName', 'category'] });
//This model will be use by the name: Products
module.exports = mongoose.model("Products", ProductSchema);
