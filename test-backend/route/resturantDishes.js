const express = require("express");
const route = express.Router()
const resturantDishCtrl = require("../controller//resturantDishCtrl.js")
const isAuth = require('../middleware/auth.js');

route.post("/" , isAuth , resturantDishCtrl.create);
route.put("/:id" , isAuth ,  resturantDishCtrl.update);
route.delete("/:id" , isAuth , resturantDishCtrl.delete);
route.get("/:id" , isAuth , resturantDishCtrl.get);
route.get("/" , isAuth , resturantDishCtrl.getAll);

module.exports = route;