const axios = require('axios');

const predictFakeNews = async (text) => {
  try {
    // Call the Python model API (running on port 5001)
    const response = await axios.post('http://localhost:5001/predict', { text });
    return {
      prediction: response.data.prediction,
      confidence: response.data.confidence,
      explanation: response.data.explanation
    };
  } catch (error) {
    console.error('Model prediction error:', error);
    throw new Error('Failed to get prediction from model');
  }
};

module.exports = { predictFakeNews };