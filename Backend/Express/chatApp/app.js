// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Array to store messages (format: { username, message })
const messages = [];

// Require route handlers from controllers
const indexController = require('./controllers/indexController');
const contactUsController = require('./controllers/contactUsController');
const successController = require('./controllers/successController');
const errorController = require('./controllers/errorController');

// Define route handlers using controllers
app.get('/', indexController.getIndex);
app.post('/', indexController.postMessage);

app.get('/contactus', contactUsController.getContactUs);
app.post('/contactus', contactUsController.postContactUs);

app.get('/success', successController.getSuccess);

// Handle unknown routes with a 404 error page
app.use(errorController.getError404);

const port = 3602;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});