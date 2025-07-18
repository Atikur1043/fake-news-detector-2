const express = require('express');
const router = express.Router();
const { analyzeUrl } = require('../controllers/analyzeUrlController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, analyzeUrl);

module.exports = router;
