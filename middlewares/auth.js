const { ErrorHandler } = require("./error");
const UserModel=require('../models/userModel.js');
const catchAsyncErrors = require("./catchAsyncError");
const jwt=require('jsonwebtoken');

const isAuthorized=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized",400));
    }

    const decode=jwt.verify(token,"abcdefpqrstuvwxyz");
    req.user=await UserModel.findById(decode.id);

    next();
})

module.exports=isAuthorized;