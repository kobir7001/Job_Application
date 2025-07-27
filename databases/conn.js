const mongoose =require('mongoose');

const ConnDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://himanbiswas376:L8qxkBwrlriy5vJQ@cluster0.axdtczu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Connected with database');
    }
    catch(err){
        console.log(err);
    }
}

module.exports=ConnDB;