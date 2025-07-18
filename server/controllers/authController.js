const connectDB = require('../config/db');
const User = require('../models/User');
const Analysis = require('../models/Analysis');
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const signupUser = async (req, res, next) => {
  logger.info('POST /api/auth/signup hit');
  await connectDB();
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username: username.toLowerCase() });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({
      displayName: username,
      username: username,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        displayName: user.displayName,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    logger.error('Signup Error:', error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        displayName: user.displayName,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    logger.error('Login Error:', error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const analyses = await Analysis.find({ user: userId });
    const analysisIds = analyses.map(a => a._id);

    if (analysisIds.length > 0) {
      await Feedback.deleteMany({ analysisId: { $in: analysisIds } });
      logger.info(`Deleted feedback for user ${userId}`);
    }

    await Analysis.deleteMany({ user: userId });
    logger.info(`Deleted analyses for user ${userId}`);
    
    await User.findByIdAndDelete(userId);
    logger.info(`Deleted user account ${userId}`);

    res.status(200).json({ message: 'User account and all associated data deleted successfully.' });
  } catch (error) {
    logger.error('Delete User Error:', error);
    next(error);
  }
};

module.exports = { signupUser, loginUser, deleteUser };
