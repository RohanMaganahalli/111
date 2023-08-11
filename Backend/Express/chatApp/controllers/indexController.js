// controllers/indexController.js
const fs = require('fs');
const path = require('path');

const messagesFilePath = path.join(__dirname, '../messages.txt');

const getIndex = (req, res) => {
const username = req.cookies.username || '';
fs.readFile(messagesFilePath, 'utf8', (err, data) => {
if (err) {
console.error(err);
res.status(500).send('Error reading messages');
return;
}
const messages = data.split('\n').filter(Boolean);
res.sendFile(path.join(__dirname, '../views/index.html'));
});
};

const postMessage = (req, res) => {
const username = req.body.username;
const message = req.body.message;

res.cookie('username', username);

fs.appendFile(messagesFilePath, `${username}: ${message}\n`, (err) => {
if (err) {
console.error(err);
res.status(500).send('Error saving message');
return;
}
console.log('Message saved!');
res.redirect('/');
});
};

module.exports = { getIndex, postMessage };