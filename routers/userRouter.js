const express = require('express');
const isAuthorized=require('../middlewares/auth.js');
const {RegisterController, LoginController, LogoutController, GetUser}=require('../controllers/userController.js');

const router=express.Router();

router.post('/register',RegisterController);
router.post('/login',LoginController);
router.get('/logout',isAuthorized,LogoutController);
router.get('/getuser',isAuthorized,GetUser);

module.exports=router;