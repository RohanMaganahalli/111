const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

const secretKey = "secretKey";

exports.postLoginController = (req, res) => {
  console.log(`req.body.email=${req.body.email}`);
  console.log(`req.body.password=${req.body.password}`);
  console.log(`req.body.User=${req.body}`);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404);
        res.json({ name: "user does not exists" });
      } else {
        console.log(user);
        bcrypt
          .compare(req.body.password, user.password)
          .then(function (resu) {
            if (resu === true) {
              // generating token when user is login with post request
              
              jwt.sign({ userId: user.id,
                is_premium: user.is_premium }, secretKey, (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json({
                    name: user.name,
                    token,
                    is_premium: user.is_premium,
                  });
                }
              });
            } else {
              console.log(`Unmatched password`);
              res.status(401);
              res.json({ name: "user password is not correct" });
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
