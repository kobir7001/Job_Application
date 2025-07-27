const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must contain at least 3 charcter"],
        maxLength:[30,"Name cannot exceed 30 charcter"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        validate:[validator.isEmail,"Please provide a valid email"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"]
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minLength:[8,"Password must contain at least 8 charcter"],
        maxLength:[32,"Password cannot exceed 32 charcter"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker","Employeer"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//jwt token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},"abcdefpqrstuvwxyz",{
        expiresIn:"7d",
    });
}

module.exports=mongoose.model('User',userSchema);