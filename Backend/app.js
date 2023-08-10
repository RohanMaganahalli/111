const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3009;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
const message = req.body.message;
fs.appendFile('chat.txt', message + '\n', (err) => {
if (err) throw err;
res.send('Message sent.');
});
});

app.get('/messages', (req, res) => {
fs.readFile('chat.txt', 'utf8', (err, data) => {
if (err) {
res.send('No messages yet.');
} else {
const messages = data.split('\n').filter(msg => msg.trim() !== '');
res.send(messages.join('<br>'));
}
});
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});