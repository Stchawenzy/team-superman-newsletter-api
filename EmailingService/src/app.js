// Setup Express
const express=require('express');
const app=express();
const index=require('./routes/index');

//Setup morgan
const morgan=require('morgan');

//Setup body-parser
const bodyParser=require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Enabling CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
    "Origin, x-Requested-Width,Content-Type,Accept,Authorization,X-Pagination");
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods",
        "POST,GET");
        return res.status(200).json({});
    }
    next();
});

//middleware pipeline for sending Email
app.use("/sendemail", index);

//Error Handling
app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message
        }
    });
});

module.exports=app;