const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const { predictionId, isCorrect, userComment } = req.body;
    
    const feedback = new Feedback({
      predictionId,
      isCorrect,
      userComment,
      timestamp: new Date()
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
    
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

module.exports = { submitFeedback };