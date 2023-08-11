// controllers/errorController.js
const path = require('path');

const getError404 = (req, res) => {
res.status(404).sendFile(path.join(__dirname, '../views/error404.html'));
};

module.exports = { getError404 };