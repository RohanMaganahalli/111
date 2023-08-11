const express=require('express');
const app=express();
const port=5001;
app.get('/',(req,res)=>{
    res.send('hello express with nodemon!');
});
app.listen(port,()=>{
    console.log('Server running at port 5001');
});