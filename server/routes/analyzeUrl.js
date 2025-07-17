const express = require('express');
const router = express.Router();
const { analyzeUrl } = require('../controllers/analyzeUrlController');
const { protect } = require('../middleware/authMiddleware');

// Add the 'protect' middleware to this route
router.post('/', protect, analyzeUrl);

module.exports = router;
