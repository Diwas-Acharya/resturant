const express = require("express");
const route = express.Router()
const adminUserCtrl = require("../controller/adminUserCtrl.js");

route.post("/signup" , adminUserCtrl.signup);
route.post("/login" , adminUserCtrl.login);

module.exports = route;