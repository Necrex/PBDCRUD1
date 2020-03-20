const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    _id:Number,
    Address: String,
    City: String,
    Country: String,
    District: String,
    First_Name: String,
    Last_Name: String,
    Status: {
        type: String,
        default:"Active"
    }
})


module.exports = mongoose.model('customers', TaskSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
}));