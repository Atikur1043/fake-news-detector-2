const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

// Add the 'protect' middleware to this route
router.get('/', protect, getHistory);

module.exports = router;
