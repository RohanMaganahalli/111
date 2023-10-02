const jwt = require('jsonwebtoken');

module.exports.extractToken = (req, res, next) => {
console.log(`in extract token middleware`);
const token = req.headers['authorization']; //when we create token it gets stored in the headers as authorization
console.log(token);
console.log('token extracted');
if (typeof token !== "undefined") {
//giving token globally to access, so that we can find the userid
req.token = token;
//decryption
jwt.verify(req.token,process.env.SECRET_TOKEN_KEY , (err, data) => {
if (err) {
console.log(err);
return res.status(401).json({
message: 'invalid token'
})
}
else {
req.data=data;
next();
}
})
}
else {
res.status(401).send({ message: 'invalid authentication' })
}
}
// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');

// const authenticate = async (req, res, next) => {
//     const token = req.header("Authorization");
//     console.log(token);
//     if(!token){
//         return res.status(401).json({message: 'Authentication failed: Tokken missing!'});
//     }
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         const user = await User.findByPk(decoded.userID);
//         if(!user){
//             return res.status(401).json({message: 'Authentication Failed: User not exist!'});
//         }
//         req.user = user;
//         next();
//     }
//     catch(error){
//         console.log('error while authorization :', error);
//         res.status(401).json({session: false, message: 'Authentication failed: Invalid token'})
//     };
// }

// module.exports = authenticate;