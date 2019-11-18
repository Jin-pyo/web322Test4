const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    title:  
    {
      type:String
    },
    price:
    {
        type:Number
    },
    quantity:
    {
        type:Number
    },
    description:
    {
        type:String
    }
    ,
    tax:
    {
        type:Boolean
    } 
    
});

const productModel=mongoose.model("Product",productSchema);

module.exports=productModel;