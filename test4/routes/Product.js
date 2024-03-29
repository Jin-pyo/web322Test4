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
        description:req.body.description,
        tax:req.body.tax
    }
    console.log(`${newProduct.tax}`);
    const error=[];
    if(newProduct.title.trim()==""){error.push("Sorry,write the title");}
    if(newProduct.price.trim()==""){error.push("Sorry,write the price");}
    if(newProduct.quantity.trim()==""){error.push("Sorry,write the quantity");}
    if(newProduct.description.trim()==""){error.push("Sorry,write descrption");}
    if(newProduct.tax==undefined){error.push("sorry, click tax");}
    
    if(error.length>0)
    {
        res.render("Product/productAddForm",{
            messages:error
        });
    }
    else
    {
        const error1=[];
        const check=req.body.title
        
        Product.findOne({title:check})
        .then(ch=>{

            if(ch==null)
            {
                const product=new Product(newProduct)
                product.save()
                .then(()=>{
                    console.log(`Data was added in the database`);
                    res.redirect("/product/list");
                })
                .catch(err=>console.log(`Error:${err}`));
            }
            else
            {
                error1.push("Same title exist");
                res.render("Product/productAddForm",{messages:error1});
            }
        })
        .catch(err=>console.log(`Error11:${err}`));
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
        console.log(`****This ${products.tax}`);
        if(products.tax==true)
        {
            const checked="checked"
            console.log(`YY`);
            res.render("Product/productEditForm",{productDocument:products,ttrue:checked})
        }
        else
        {
            const checked="checked"
            console.log(`NN`);
            res.render("Product/productEditForm",{productDocument:products,ffalse:checked})
        }

        
    })
    .catch(err=>console.log(`Error:${err}`));
});

router.put("/edit/:id",(req,res)=>
{
    Product.findById(req.params.id)
    .then((product)=>
    {
        const error=[];

        if(req.body.title==""){error.push("Sorry,write the title");}
        if(req.body.price==""){error.push("Sorry,write the price");}
        if(req.body.quantity==""){error.push("Sorry,write the quantity");}
        if(req.body.description==""){error.push("Sorry,write descrption");}
        if(req.body.tax==undefined){error.push("sorry, click tax");}
        
        if(error.length>0)
        {
            Product.findById(req.params.id)
            .then((products)=>
            {
                if(products.tax==true)
                {
                    const checked="checked"
                    res.render("Product/productEditForm",{productDocument:products,messages:error,ttrue:checked})
                }
                else
                {
                    const checked="checked"
                    res.render("Product/productEditForm",{productDocument:products,messages:error,ffalse:checked})
                }
            })
            .catch(err=>console.log(`Error:${err}`));
        }
        else
        {
            const error1=[];
            const check=req.body.title;

            Product.findOne({title:check})
            .then(ch=>{

                if(ch==null || check==product.title)
                {
                    product.title=req.body.title;
                    product.price=req.body.price;
                    product.quantity=req.body.quantity;
                    product.description=req.body.description;
                    product.tax=req.body.tax;

                    console.log(`This is tax after fix ${product.tax}`);
                    product.save()
                    .then(()=>
                    {
                        res.redirect("/product/list");
                    })
                    .catch(err=>console.log(`Error: ${err}`));
                }
                else
                {
                    error1.push("Same Title exist");

                    Product.findById(req.params.id)
                    .then((products)=>
                    {
                        if(products.tax==true)
                        {
                            const checked="checked"
                            res.render("Product/productEditForm",{productDocument:products,messages:error1,ttrue:checked})
                        }
                        else
                        {
                            const checked="checked"
                             res.render("Product/productEditForm",{productDocument:products,messages:error1,ffalse:checked})
                        }
                    })
                    .catch(err=>console.log(`Error:${err}`)); 
                }
            })
        }
    })
    .catch(err=>console.log(`Error:${err}`));
});

module.exports=router;


