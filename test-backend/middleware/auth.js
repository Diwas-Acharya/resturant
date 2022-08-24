const Admin = require('../model/adminUser.js');
const isAuth = async(req , res , next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.json({success : false , mgs : "Token required , please login"})
        }
        const admin = new Admin();
        const validToken = await admin.verifyToken(token);
        if(!validToken){
            return res.json({success : false , mgs : "Unauthorized"})
        }
        next();
    }catch(err){
        console.log(err)
        res.json({success : false , mgs : "something went wrong" , error : err.msg})
    }
}

module.exports = isAuth;