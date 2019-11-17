const express = require('express')
const router = express.Router();
const Product = require("../models/Product");

router.get("/add",(req,res)=>
{
    res.render("Product/productAddForm")
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
        res.render("Product/productAddForm",{
            messages:error
        });
    }

    else
    {
        const product=new Product(newProduct)
        product.save()
        .then(()=>{
            console.log(`Data was added in the database`);
            res.redirect("/product/add");
        })
        .catch(err=>console.log(`Error:${err}`));
    }
});

router.get("/list",(req,res)=>
{
    Product.find()
    .then((products)=>{
        res.render("Product/productdashboard",{lists:products});
    })
    .catch(err=>console.log(`Error:${err}`));
});


router.get("/edit/:id",(req,res)=>
{
    Product.findById(req.params.id)
    .then((products)=>
    {
        res.render("Product/productEditForm",{productDocument:products})
    })
    .catch(err=>console.log(`Error:${err}`));
});

router.put("/edit/:id",(req,res)=>
{
    Product.findById(req.params.id)
    .then((product)=>
    {
        product.title=req.body.title;
        product.price=req.body.price;
        product.quantity=req.body.quantity;
        product.description=req.body.description;
        
        product.save()
        .then(()=>
        {
            res.redirect("/product/list");
        })
        .catch(err=>console.log(`Error: ${err}`));
    })
    .catch(err=>console.log(`Error:${err}`));
});

module.exports=router;


