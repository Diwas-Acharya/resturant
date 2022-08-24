const ResturantDish = require('../model/resturant.js');

module.exports = {
    create : async(req , res) => {
        try{
           const newDish = new ResturantDish(req.body);
           await newDish.save();
           res.json({success : true , msg : 'New Dish added' , data : newDish}) 
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },

    update : async(req , res) => {
        try{
           const data = await ResturantDish.findByIdAndUpdate(req.params.id , req.body , {new : true});
           res.json({success : true , msg : 'Dish updated' , data}) 
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },

    delete : async(req , res) => {
        try{
           const data = await ResturantDish.findByIdAndDelete(req.params.id);
           res.json({success : true , msg : 'Dish deleted'}) 
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },

    get : async(req , res) => {
        try{
           const data = await ResturantDish.findById(req.params.id);
           res.json({success : true , msg : 'Dish found' , data}) 
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },

    getAll : async(req , res) => {
        try{
           const data = await ResturantDish.find();
           res.json({success : true , msg : 'Dishs found' , data}) 
        }catch(err){
            res.json({success : false , msg : "something went wrong" , error : err.message})
        }
    },
}