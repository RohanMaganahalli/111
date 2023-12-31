const express=require('express');
const router=express.Router();
const{getUserExpenseDownloadController}=require('../controllers/userController');

const extractToken=(req,res,next)=>{
    console.log(`in expense route`);
    const token=req.headers['authorization'];
    console.log(token);
    console.log('token extracted');
    if(typeof token!=="undefined"){
        req.token=token;
        next();
    }
    else{
        res.status(403).send({message:'invalid authentication'})
    }
}

router.get('/download',extractToken,getUserExpenseDownloadController)
module.exports=router;