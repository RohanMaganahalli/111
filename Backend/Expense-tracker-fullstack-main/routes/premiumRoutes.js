const express=require('express');
const premiumController=require('../controllers/premiumController');
const router=express.Router();

const extractToken=(req,res,next)=>{
    const token=req.headers['authorization'];
    console.log('token extracted');
    if(typeof token !=="undefined"){
        req.token=token;
        next();
    }
    else{
        res.status(403).send({message:'invalid authentication'})
    }
  
}

router.get('/',premiumController.getPremiumController)
 router.post('/',extractToken,premiumController.postPremiumController)
 router.get('/dashboard',extractToken,premiumController.getDashboardController)

module.exports=router;