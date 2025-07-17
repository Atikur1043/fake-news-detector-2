const express = require('express');
const router = express.Router();
const { analyzeText } = require('../controllers/analyzeController');
const { protect } = require('../middleware/authMiddleware');

// Add the 'protect' middleware to this route
router.post('/', protect, analyzeText);

module.exports = router;
