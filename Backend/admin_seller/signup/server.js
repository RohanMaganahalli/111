const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
const port = process.env.PORT || 8080;

// Configure body-parser to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database configuration
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root123',
database: 'mydb'
});

// Connect to the database
db.connect((err) => {
if (err) {
console.error('Database connection failed: ' + err.message);
} else {
console.log('Connected to the database');
}
});

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views','index.html'));
});

app.get('/signup.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'));
});

app.get('login.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
});

// Register a new user
app.post('/register', (req, res) => {
const { name, email, password } = req.body;

bcrypt.hash(password,10,(err,hash)=>{
    if(err){
        console.error('Password hashing failed:'+err.message);
        return res.status(500).send('Internal Server Error');
    }

// Insert the user data into the database
db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err) => {
if (err) {
console.error('User registration failed: ' + err.message);
return res.status(500).send('Internal Server Error');
}

res.status(200).send('User registration successful');
});
});
});

// Login an existing user
app.post('/login', (req, res) => {
const { email, password } = req.body;

// Retrieve user data from the database based on the provided email
db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
if (err) {
console.error('Error querying the database: ' + err.message);
return res.status(500).send('Internal Server Error');
}

if (results.length === 0) {
return res.status(401).send('User not found');
}

const user = results[0];

bcrypt.compare(password,user.password,(bcryptErr,bcryptResult)=>{
    if(bcryptErr){
        console.error('Password comparison failed:'+bcryptErr.message);
        return res.status(500).send('Internal Server Error');
    }
    if(bcryptResult){
        res.status(200).send('User logged in successfully');
    }else{
        res.status(401).send('Incorrect password');
    }
});
});
});
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});