const express = require("express");
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const methodOverride=require('method-override');

require("dotenv").config({path:'./config/keys.env'});

//import your router objects
const taskRoutes=require("./routes/Task");
const generalRoutes=require("./routes/General");

//creation of app object
const app = express();

//Most be above your routes
app.use(bodyParser.urlencoded({extended:false}));

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//This is used to make load all static resources
app.use(express.static("public"));

app.use("/",generalRoutes);
app.use("/task",taskRoutes);

app.use("/",(req,res)=>
{
    res.render("General/404");
});

//This tells Express to set Handlebars as template engine
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

const MONGO_DB_URL=`${process.env.MONGO_DB_URL}`;

mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log(`Database is connected`)
})
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Your Web Server has been connected`);
    
});


