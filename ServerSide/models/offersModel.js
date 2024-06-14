const mongoose = require('mongoose');
const { Schema } = mongoose

const Offersschema = new Schema({
    OfferTitle:{type: String},
    OfferDescription:{type: String},
    Discount:{type: Number},
    StartDate:{type: String},
    EndDate:{type: String},
    Availability:{type: String},
    Availability: {type: String},
    RedemptionMethod:{type: String}

});

module.exports = mongoose.model('Offers', Offersschema)