const express=require('express');
const postSignUpController=require('../controllers/signupController');
const router=express.Router();

router.post('/signup',postSignUpController)

module.exports=router;