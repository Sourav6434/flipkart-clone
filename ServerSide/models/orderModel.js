const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
    userId:{type:String, require:true},
    order: [
        {
          product: { type: String, require: true },
          quantity: { type: String, require: true },
        },
        {
          timestamps: true,
        },
      ],

})