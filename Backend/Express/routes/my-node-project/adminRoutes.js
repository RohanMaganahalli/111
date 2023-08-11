const express = require('express');
const router = express.Router();

// Admin routes
router.get('/', (req, res) => {
res.send('Admin Home Page');
});

router.get('/products', (req, res) => {
res.send('Admin Products Page');
});

module.exports = router;
