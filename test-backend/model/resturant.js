const mongoose = require("mongoose");

const resturant = mongoose.Schema({
    name : String,
    price : Number,
    photo : String,
} , {timestamps : true})

const ResturantDish = mongoose.model('resturant_dish' , resturant);
module.exports = ResturantDish;
