const {validationResult}=require("express-validator");

exports.validationMiddleware=(req,res,next) =>{
   let error=validationResult(req);
    
   if(!error.isEmpty()){
    return res.status(400).json({
        error: error.array(),
    })
   }
   next()

}