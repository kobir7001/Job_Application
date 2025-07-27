const mongoose=require('mongoose');
const validator=require('validator');

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must contain at least 3 character"],
        maxLength:[30,"Name cannot exceed 30 character"],
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please provide a valid email"],
        required:[true,"Please provide your email"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
    },
    address:{
        type:String,
        required:[true,"Please provide your address"],
    },
    resume_link:{
        type:String,
        required:[true,"Please provide your resume link"],
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        },
    },
    employeerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employeer"],
            required:true
        }
    },
})


module.exports=mongoose.model('Application',applicationSchema);