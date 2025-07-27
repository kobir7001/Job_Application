const catchAsyncErrors = require('../middlewares/catchAsyncError');
const { ErrorHandler } = require('../middlewares/error.js');
const JobModel=require('../models/jobModel.js');

const GetAllJob=catchAsyncErrors(async(req,res,next)=>{
    const jobs=await JobModel.find({expired:false});
    res.status(200).json({
        success:true,
        jobs
    });
})


const PostJob=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed",400));
    }

    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body;
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please fill all the field",400));
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide any one type salary",400));
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Cannot enter fixed and range salary together"));
    }

    const postedBy=req.user._id;
    const job=await JobModel.create({
        title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy
    })
    res.status(200).json({
        success:true,
        message:"Job posted successfully",
        job
    })
})


const GetMyJobs=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed",400));
    }

    const myjobs=await JobModel.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myjobs
    })
})

const UpdateJob=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed",400));
    }

    const {id}=req.params;
    let job=await JobModel.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }
    job=await JobModel.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        job,
        message:"Job Updated Successfully"
    })
})


const DeleteJob=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=="Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed",400));
    }

    const {id}=req.params;
    const job=JobModel.findById(id);
    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:'Job deleted successfully'
    })
})

const GetSingleJob=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    try{
        const job=await JobModel.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found",404));
        }
        res.status(200).json({
            success:true,
            job
        })
    }
    catch(error){
        return next(new ErrorHandler("Invalid ID/CastError",400));
    }
})


module.exports={GetAllJob,PostJob,GetMyJobs,UpdateJob,DeleteJob,GetSingleJob};