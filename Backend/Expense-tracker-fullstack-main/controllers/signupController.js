const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const secretKey = "secretKey";
const postSignUpController = async (req, res) => {
  console.log(`req.body.name=${req.body.name}`);
  console.log(`req.body.email=${req.body.email}`);
  console.log(`req.body.password=${req.body.password}`);
  console.log(req.body);
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  })
  console.log(user);
  if(user){
   return res.status(409).json({message:'User already exists',success:false});
  }
  else{
  bcrypt
    .hash(req.body.password, 10)
    .then(function (hash) {
      // Store hash in your password DB.
      req.body.password = hash;
      User.create(req.body)
        .then((result) => {
          console.log(result);
          console.log(result.dataValues.id);
          const user = {
            userId: result.dataValues.id,
            is_premium: result.dataValues.is_premium,
          };
          jwt.sign({ user }, secretKey, (err, token) => {
            if (err) {
              console.log(err);
            } else {
              console.log("successful encry");
              res.json({
                success: true,
                message: "User login Succesfully",
                token,
                name: result.dataValues.name,
                is_premium: result.dataValues.is_premium,
              });
            }
            return;
          });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.end();
    });
  }
};
module.exports = postSignUpController