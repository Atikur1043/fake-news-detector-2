const express = require('express');
const router = express.Router();
const { signupUser, loginUser, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.delete('/profile', protect, deleteUser);

module.exports = router;
