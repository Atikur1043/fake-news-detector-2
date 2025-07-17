const { predictFakeNews } = require('../services/modelService');
const Analysis = require('../models/Analysis');
const logger = require('../utils/logger');

const analyzeText = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const { prediction, confidence } = await predictFakeNews(text);

    // Create the analysis record and associate it with the logged-in user
    const newAnalysis = new Analysis({
      text,
      prediction,
      confidence,
      user: req.user._id, // Get user ID from the request object
    });
    await newAnalysis.save();
    
    logger.info(`Analysis by user ${req.user.username} saved with ID: ${newAnalysis._id}`);

    res.status(200).json({
      _id: newAnalysis._id,
      prediction: newAnalysis.prediction,
      confidence: newAnalysis.confidence,
      explanation: `Model predicts the article is likely ${prediction} with ${(confidence * 100).toFixed(1)}% confidence.`
    });

  } catch (error) {
    logger.error('Analysis controller error:', error);
    next(error);
  }
};

module.exports = { analyzeText };
