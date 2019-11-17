const express = require('express')
const router = express.Router();
const Task = require("../models/Task");

router.get("/add",(req,res)=>
{
    res.render("Task/taskAddForm")
});

router.post("/add",(req,res)=>
{
    const newProduct=
    {
        title:req.body.title,
        price:req.body.price,
        quantity:req.body.quantity,
        description:req.body.description
    }

    const error=[];
    if(newProduct.title.trim()==""){error.push("Sorry,write the title");}
    if(newProduct.price.trim()==""){error.push("Sorry,write the price");}
    if(newProduct.quantity.trim()==""){error.push("Sorry,write the quantity");}
    if(newProduct.description.trim()==""){error.push("Sorry,write descrption");}

    if(error.length>0)
    {
        res.render("Task/taskAddForm",{
            messages:error
        });
    }

    else
    {
        const task=new Task(newProduct)
        task.save()
        .then(()=>{
            console.log(`Data was added in the database`);
            res.redirect("/task/list");
        })
        .catch(err=>console.log(`Error:${err}`));
    }
});

router.get("/list",(req,res)=>
{
    Task.find()
    .then((tasks)=>{
        res.render("Task/taskdashboard",{lists:tasks});
    })
    .catch(err=>console.log(`Error:${err}`));
});


router.get("/edit/:id",(req,res)=>
{
    Task.findById(req.params.id)
    .then((task)=>
    {
        res.render("Task/taskEditForm",{taskDocument:task})
    })
    .catch(err=>console.log(`Error:${err}`));
});

router.put("/edit/:id",(req,res)=>
{
    Task.findById(req.params.id)
    .then((task)=>
    {
        task.title=req.body.title;
        task.price=req.body.price;
        task.quantity=req.body.quantity;
        task.description=req.body.description;
        
        task.save()
        .then(()=>
        {
            res.redirect("/task/list");
        })
        .catch(err=>console.log(`Error: ${err}`));
    })
    .catch(err=>console.log(`Error:${err}`));
});

module.exports=router;


