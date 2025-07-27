const express = require('express');
const isAuthorized=require('../middlewares/auth.js');
const { JobSeekerGetAllApplications, EmployeerGetAllApplications, PostApplication } = require('../controllers/applicationController.js');

const router=express.Router();

router.get('/jobseeker/getall',isAuthorized,JobSeekerGetAllApplications);
router.get('/employeer/getall',isAuthorized,EmployeerGetAllApplications);
router.post('/post',isAuthorized,PostApplication);

module.exports=router;