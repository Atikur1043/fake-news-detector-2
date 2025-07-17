const connectDB = require('../config/db');
const Analysis = require('../models/Analysis');
const logger = require('../utils/logger');

const getHistory = async (req, res, next) => {
  await connectDB();
  try {
    // Find only the analysis records that belong to the logged-in user
    const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json(history);
  } catch (error) {
    logger.error('Failed to fetch user analysis history:', error);
    next(error);
  }
};

module.exports = { getHistory };
