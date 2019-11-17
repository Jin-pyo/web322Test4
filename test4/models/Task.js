const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const taskSchema=new Schema({
    title:  
    {
      type:String,
      required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
    description:
    {
        type:String,
        required:true
    }
});

const taskModel=mongoose.model("Task",taskSchema);

module.exports=taskModel;