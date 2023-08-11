// controllers/successController.js
const path = require('path');

const getSuccess = (req, res) => {
res.sendFile(path.join(__dirname, '../views/success.html'));
};

module.exports = { getSuccess };