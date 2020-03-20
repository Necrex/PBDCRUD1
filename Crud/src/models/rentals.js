const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const places = new Schema({
    _id:Number,
    name : String,
    property_type : String,
    price : Number,
    id_customer: Number
})


module.exports = mongoose.model('listingsandreviews', places);;