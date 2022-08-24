const express = require("express");
const cors = require("cors")
require('dotenv').config()
require('./config/db.js');
const PORT = process.env.PORT || 5000;
const apiRoute = require('./route/index.js');
const app = express();
app.use(express.json());

app.use(cors())

app.use('/api' , apiRoute);

app.listen(PORT , () => {
    console.log("server is running at ", PORT)
})

