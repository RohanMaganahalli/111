const express = require('express');
const router = express.Router();

// Shop routes
router.get('/', (req, res) => {
res.send('Shop Home Page');
});

router.get('/products', (req, res) => {
res.send('Shop Products Page');
});

module.exports = router;