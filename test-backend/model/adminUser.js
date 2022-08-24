const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const adminUser = mongoose.Schema({
    username : {
        type : String,
        required : [true , 'Please provide username']
    },
    password : {
        type : String,
        required : [true , 'Please provide password']
    }
} , {timestamps : true})

adminUser.pre('save' , async function(next){
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

adminUser.methods.genetrateToken = async function(){
    const token = await jwt.sign({
        id : this._id,
        username : this.username
    } , process.env.JWT_SECRET , {expiresIn : '1d'});
    return token;
}

adminUser.methods.verifyPassword = function(newPassword , Oldpassword){
    const valid = bcrypt.compareSync(newPassword, Oldpassword);
    return valid;
}

adminUser.methods.verifyToken = async function(token){
    try{
        const valid = jwt.verify(token , process.env.JWT_SECRET);
        if(valid){
            return true;
        }
        return false;
    }catch(err){
        console.log(err)
        return false
    }
}   


const Admin = mongoose.model('admin' , adminUser);
module.exports = Admin;
