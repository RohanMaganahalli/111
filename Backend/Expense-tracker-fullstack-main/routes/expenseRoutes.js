const express=require('express');
const{postExpenseController,getExpenseController,deleteExpenseController}=require('../controllers/expenseControllers');
const router=express.Router();

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
        res.status(403).send({message:'invalid authenticator'})
    }
}

router.get('/',getExpenseController);
router.post('/',postExpenseController);
router.delete('/:id',deleteExpenseController);

module.exports=router;