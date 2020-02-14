'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
    name: String,
    category: String,
    price: Number,
    brand: String,
    description: String,
    image: String
});


module.exports = mongoose.model('Item', ItemSchema);