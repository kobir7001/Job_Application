const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[3,"Job title contain at least 3 character"],
        maxLength:[50,"Job title cannot exceed 50 character"],
    },
    description:{
        type:String,
        required:[true,"Please provide job description"],
        minLength:[3,"Job description contain at least 3 character"],
        maxLength:[350,"Job description cannot exceed 350 character"],
    },
    category:{
        type:String,
        required:[true,"Please provide job category"],
    },
    country:{
        type:String,
        required:[true,"Please provid country for this job"],
    },
    city:{
        type:String,
        required:[true,"Please provid city for this job"],
    },
    location:{
        type:String,
        required:[true,"Please provid exact location for this job"],
        minLength:[10,"Job location contain at least 20 character"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain at least 4 digit"],
        maxLength:[9,"Fixed salary cannot exceed 9 digit"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must contain at least 4 digit"],
        maxLength:[9,"Salary from cannot exceed 9 digit"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary to must contain at least 4 digit"],
        maxLength:[9,"Salary to cannot exceed 9 digit"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
})


module.exports=mongoose.model('Job',jobSchema);