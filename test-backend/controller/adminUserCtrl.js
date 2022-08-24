const Admin = require('../model/adminUser.js');

module.exports = {
    signup : async(req , res) => {
        try{
            const {username , password} = req.body;
            if(!username || !password){
                return res.json({success : false , msg : "Missing parameters"});
            }

            const exist = await Admin.findOne({username});

            if(exist){
                return res.json({success : false , msg : "Admin already exist with this username"})
            }

            const user = new Admin({username , password});
            await user.save();
            res.json({success : true , msg : "Signup success"})
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },

    login : async(req , res) => {
        try{
            const {username , password} = req.body;
            if(!username || !password){
                return res.json({success : false , msg : "Missing parameters"});
            }
            
            const exist = await Admin.findOne({username});

            if(!exist){
                return res.json({success : false , msg : "Invalid credentials"})
            }

            const valid = exist.verifyPassword(password , exist.password)

            if(!valid){
                return res.json({success : false , msg : "Invalid credentials"})
            }
            const token = await exist.genetrateToken();
            let data = {
                username , token
            }
            res.json({success : true , msg : "login success" , data})
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },
}