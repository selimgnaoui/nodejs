const express = require ('express');
const morgan = require ('morgan');
const app=express();
const prodctRoutes=require ('./api/routes/product');
const userRoutes=require ('./api/routes/user');
const bodyParser=require ('body-parser');
const mongoose = require ('mongoose');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/products',prodctRoutes);
app.use('/user',userRoutes);
app.use(morgan('dev'));
mongoose.connect("mongodb://salim:salim@ds245347.mlab.com:45347/nodedb12");

app.use((req,res,next)=> {
const error =new Error ('Not Fossund');
error.status=404;
next (error);
});

app.use((error,req,res,next)=> {
res.status(500);
res.json ({
error : {
     message : error.message 
}
})
});


module.exports=app;