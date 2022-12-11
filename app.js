//Basic Lib Import
const express=require('express');
const app = new express();
const bodyParser = require('body-parser')

//security Middleware Lib Import 
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp')
const cors = require('cors');
require("dotenv").config();
const morgan = require("morgan");
const { readdirSync } = require("fs");


//Database Lib Import
const mongoose = require("mongoose");


//security Middleware Implement
app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(mongoSanitize())
app.use(xss())
app.use(cors());

//Body Parser Implement
app.use(bodyParser.json())


//Request Rate Limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// DB Connection
let Option = {user:'',pass:'', autoIndex:true}
mongoose
    .connect(process.env.DATABASE, Option)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("DB Error => ", err));

// let URL = process.env.DATABASE;
// let OPTION={user:'', pass:""};
// mongoose.connect(URL ,OPTION,(error)=>{
//     console.log("Connection Success");
//     console.log(error);
// })



 //routes middleware
readdirSync("./src/routes").map(r =>app.use("/api/v1", require(`./src/routes/${r}`)))


//undigined Toute Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})


module.exports=app