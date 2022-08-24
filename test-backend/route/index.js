const express = require("express");
const route = express.Router()
const adminRoute = require("./adminRoute.js");
const resturantDish = require("./resturantDishes.js");

route.use("/admin" , adminRoute)
route.use("/resturant-dish" , resturantDish)

module.exports = route;