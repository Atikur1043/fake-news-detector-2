const express = require('express');
const router = express.Router();
const { analyzeText } = require('../controllers/analyzeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, analyzeText);

module.exports = router;
