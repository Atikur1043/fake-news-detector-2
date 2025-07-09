const { predictFakeNews } = require('../services/modelService');

const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    const prediction = await predictFakeNews(text);
    res.json(prediction);
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
};

module.exports = { analyzeText };