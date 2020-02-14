'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
    name: String,
    price: Number,
    Brand: String,
    Description: String,
    Image: String
});


module.exports = mongoose.model('Item', ItemSchema);