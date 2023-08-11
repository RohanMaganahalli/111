const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Path helper function for cross-OS compatibility
function getPath(relativePath) {
return path.join(__dirname, relativePath);
}

// Array to store messages (format: { username, message })
const messages = [];

// Serve the HTML form
app.get('/', (req, res) => {
const username = req.cookies.username || '';
const messageList = messages.map(entry => `${entry.username}: ${entry.message}`).join('<br>');
res.sendFile(getPath('index.html'));
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

// "Contact Us" form
app.get('/contactus', (req, res) => {
res.sendFile(getPath('contactus.html'));
});

// Handle "Contact Us" form submission and show success message
app.post('/contactus', (req, res) => {
const name = req.body.name;
const email = req.body.email;
const phone = req.body.phone;
const timeToCall = req.body.timeToCall;

// Redirect to the success page with a success message
res.redirect('/success');
});

// Success message
app.get('/success', (req, res) => {
res.send('<h1>Form Successfully Filled</h1>');
});

// Handle "Page Not Found" with a 404 status
app.use((req, res) => {
res.status(404).send('Page Not Found');
});

const port = 3504;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});