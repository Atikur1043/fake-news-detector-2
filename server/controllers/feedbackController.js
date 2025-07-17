const Feedback = require('../models/Feedback');
const Analysis = require('../models/Analysis');
const logger = require('../utils/logger');

const submitFeedback = async (req, res, next) => {
  try {
    const { analysisId, isCorrect } = req.body;

    if (!analysisId) {
      return res.status(400).json({ error: 'Analysis ID is required for feedback.' });
    }

    const analysisExists = await Analysis.findById(analysisId);
    if (!analysisExists) {
      return res.status(404).json({ error: 'Original analysis not found.' });
    }

    const newFeedback = new Feedback({
      analysisId,
      isCorrect,
    });

    await newFeedback.save();
    
    logger.info(`Feedback successfully submitted for analysis ID: ${analysisId}`);
    res.status(201).json({ message: 'Feedback submitted successfully.' });

  } catch (error) {
    logger.error('Feedback submission error:', error);
    next(error);
  }
};

module.exports = { submitFeedback };
