const express = require ('express');
const router=express.Router();
const Product = require ('../model/product');
const mongoose = require ('mongoose');
router.get('/:id',(req,res,next)=>{
    const object = {
    
    id : req.params.id,
   
}
    
    
    res.status(200).json({
	message : "Handling GET requests for product  with the id : =>    " ,
        object : object 
	});
});


router.post('/',(req,res,next)=>{
   
       const product = new Product ({
    
    _id : new mongoose.Types.ObjectId(),
    name : req.body.product_Name,
    price : req.body.price,              
    });
    product.save();
    console.log (req);
    res.status(200).json({
	message : "Products that has been sent ",
        Product : product
        
	});
});

module.exports=router;