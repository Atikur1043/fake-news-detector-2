const axios = require('axios');
const logger = require('../utils/logger'); // Optional for logging

const predictFakeNews = async (text) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/predict', // Python API endpoint
      { text },
      { timeout: 5000 } // 5-second timeout
    );
    
    return {
      prediction: response.data.prediction,
      confidence: response.data.confidence,
      explanation: response.data.explanation || "No explanation provided"
    };

  } catch (error) {
    logger.error('Model API error:', error.message);
    throw new Error(`Model service failed: ${error.response?.data?.error || error.message}`);
  }
};

module.exports = { predictFakeNews };