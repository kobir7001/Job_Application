const catchAsyncErrors = require('../middlewares/catchAsyncError.js');
const { ErrorHandler } = require('../middlewares/error.js');
const ApplicationModel=require('../models/applicationModel.js');
const JobModel=require('../models/jobModel.js');


const EmployeerGetAllApplications=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed",400));
    }

    const {_id}=req.user;
    const applications=await ApplicationModel.find({'employeerID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
})


const JobSeekerGetAllApplications=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Employeer"){
        return next(new ErrorHandler("Employeer is not allowed",400));
    }

    const {_id}=req.user;
    const applications=await ApplicationModel.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
})




const PostApplication=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Employeer"){
        return next(new ErrorHandler("Employeer is not allowed",400));
    }
    const {name,email,phone,address,resume_link,jobId}=req.body;
    const applicantID={
        user:req.user._id,
        role:"Job Seeker"
    }

    if(!jobId){
        return next(new ErrorHandler("Job not found",404));
    }

    const jobDetails=await JobModel.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found",404));
    }

    const employeerID={
        user:jobDetails.postedBy,
        role:"Employeer",
    }

    if(!name || !email || !phone || !address || !resume_link){
        return next(new ErrorHandler("Please fill all the field",400));
    }


    const application=await ApplicationModel.create({
        name,email,phone,address:jobDetails.title,resume_link,applicantID,employeerID
    });

    res.status(200).json({
        success:true,
        message:"Application submitted successfully",
        application
    })
})



module.exports={EmployeerGetAllApplications,JobSeekerGetAllApplications,PostApplication};