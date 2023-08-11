// controllers/contactUsController.js
const path = require('path');

const getContactUs = (req, res) => {
res.sendFile(path.join(__dirname, '../views/contactus.html'));
};

const postContactUs = (req, res) => {
const name = req.body.name;
const email = req.body.email;
const phone = req.body.phone;
const timeToCall = req.body.timeToCall;

// Redirect to the success page with a success message
res.redirect('/success');
};

module.exports = { getContactUs, postContactUs };