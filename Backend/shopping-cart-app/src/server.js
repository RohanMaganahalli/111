const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const products = [
{ id: 1, name: 'Product 1', price: 10.0 },
{ id: 2, name: 'Product 2', price: 15.0 },
// ... Add more products
];

const carts = {}; // User ID -> List of product IDs

app.use(express.static('public'));

// Endpoint to fetch products
app.get('/products', (req, res) => {
res.json(products);
});

// Endpoint to add a product to the cart
app.post('/add_to_cart', (req, res) => {
const { user_id, product_id } = req.body;

if (!user_id || !product_id) {
return res.status(400).json({ error: 'Invalid request' });
}

if (!carts[user_id]) {
carts[user_id] = [];
}

if (!carts[user_id].includes(product_id)) {
carts[user_id].push(product_id);
return res.status(200).json({ message: 'Product added to cart' });
} else {
return res.status(200).json({ message: 'Product already in cart' });
}
});

// Endpoint to fetch user's cart
app.get('/cart', (req, res) => {
const user_id = 1; // Replace with actual user ID (from authentication)
const user_cart = carts[user_id] || [];
const cart_items = user_cart.map(productId => {
return products.find(product => product.id === productId);
});
res.json(cart_items);
});

app.listen(5555, () => {
console.log('Server is running on port 5555');
});