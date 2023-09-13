const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'mydb'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
});

app.get('/signup.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','signup.html'));
});

app.post('/signup',(req,res)=>{
    const{name,email,password}=req.body;
    const sql='INSERT INTO users(name,email,password) VALUES (?,?,?)';
    db.query(sql,[name,email,password],(err,result)=>{
        if(err){
            res.statys(500).send('Error registering user');
            throw err;
        }
        res.status(200).send('Registration successful');
    });
});

const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});