const express = require ('express');
const router=express.Router();
const Product = require ('../model/product');
const Auth = require ('../middelware/check-auth');
const mongoose = require ('mongoose');


router.get('/get/:id',(req,res,next)=>{
    const object = {
    
    id : req.params.id,
   
}
    
    
    res.status(200).json({
	message : "Handling GET requests for product  with the id : =>    " ,
        object : object 
	});
});


router.get('/getall',Auth,(req,res,next)=>{
   Product.find({},  function (err, docs) {
  if (err)
  {
     res.status(401).json({
	message : "THERE IS NOTHING",
        
        
	});  
      
  }else{
      res.status(200).json({
	message : docs,
        
        
	});
      
  }
})
   console.log("sa")
    
});

router.post('/addproduct',(req,res,next)=>{
   
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