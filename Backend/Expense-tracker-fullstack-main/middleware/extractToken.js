const jwt = require('jsonwebtoken');

module.exports.extractToken = (req, res, next) => {
console.log(`in extract token middleware`);
console.log(req.headers);
const token = req.headers.authorization; //when we create token it gets stored in the headers as authorization
console.log(token);
console.log('token extracted');
if (token) {
//giving token globally to access, so that we can find the userid
req.token = token;
//decryption
jwt.verify(token,'secretKey', (err, data) => {
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
