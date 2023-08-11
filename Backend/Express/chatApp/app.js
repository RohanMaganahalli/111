const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Array to store messages (format: { username, message })
const messages = [];

// Serve the HTML form
app.get('/', (req, res) => {
const username = req.cookies.username || '';
const messageList = messages.map(entry => `${entry.username}: ${entry.message}`).join('<br>');
res.send(`
<h1>Chat App</h1>
<form action="/" method="POST">
<label for="username">Username:</label>
<input type="text" id="username" name="username" value="${username}">
<label for="message">Message:</label>
<input type="text" id="message" name="message">
<button type="submit">Send</button>
</form>
<h2>Messages</h2>
<div>${messageList}</div>
`);
});

// Handle form submission
app.post('/', (req, res) => {
const username = req.body.username;
const message = req.body.message;

// Store the username in a cookie
res.cookie('username', username);

// Store the message in the messages array
messages.push({ username, message });

res.redirect('/');
});

const port = 3502;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});