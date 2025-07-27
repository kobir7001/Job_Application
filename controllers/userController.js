const catchAsyncErrors = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const UserModel=require('../models/userModel.js');
const sendToken=require('../utills/jwtToken.js');

const RegisterController=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,phone,role,password}=req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill all the field"));
    }
    const isEmail=await UserModel.findOne({email});

    if(isEmail){
        return next(new ErrorHandler("Email already exist"));
    }

    const user=await UserModel.create({
        name,email,phone,role,password
    });
    sendToken(user,200,res,"User Registered Successfully");
})


const LoginController=catchAsyncErrors(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next (new ErrorHandler("Please fill all the field",400));
    }

    const user=await UserModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    if(user.role!==role){
        return next(new ErrorHandler("User with this role is not found",400));
    }
    sendToken(user,200,res,"User logged in successfully");
})


const LogoutController=catchAsyncErrors(async(req,res,next)=>{
    res.status(201).cookie("token","",{httpOnly:true,expires:new Date(Date.now())}).json({
        success:true,
        message:'User logged out successfully',
    })
})


const GetUser=catchAsyncErrors((req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })
})


module.exports={RegisterController,LoginController,LogoutController,GetUser};