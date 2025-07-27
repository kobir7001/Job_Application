const express = require('express');
const isAuthorized=require('../middlewares/auth.js');
const {GetAllJob, PostJob, GetMyJobs, UpdateJob, DeleteJob, GetSingleJob } = require('../controllers/jobController');

const router=express.Router();

router.get('/getall',GetAllJob);
router.post('/post',isAuthorized,PostJob);
router.get('/getmyjobs',isAuthorized,GetMyJobs);
router.put('/update/:id',isAuthorized,UpdateJob);
router.delete('/delete/:id',isAuthorized,DeleteJob);
router.get('/:id',isAuthorized,GetSingleJob);

module.exports=router;