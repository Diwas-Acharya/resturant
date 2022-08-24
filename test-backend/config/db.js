const mongoose = require('mongoose');

const url = process.env.DATABASE;

mongoose.connect(url).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database not connected , error " , err)
})