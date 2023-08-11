const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form on the /add-product route
app.get('/add-product', (req, res) => {
res.send(`
<form action="/add-product" method="post">
<label for="productName">Product Name:</label>
<input type="text" id="productName" name="productName"><br>
<label for="productSize">Product Size:</label>
<input type="text" id="productSize" name="productSize"><br>
<input type="submit" value="Submit">
</form>
`);
});

// Handle the submitted form data
app.post('/add-product', (req, res) => {
const productName = req.body.productName;
const productSize = req.body.productSize;
console.log(`Product Name: ${productName}, Product Size: ${productSize}`);
res.send('Product added successfully!');
});

// Start the server
const port = 5006;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});