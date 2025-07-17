const axios = require('axios');
const logger = require('../utils/logger');

const MODEL_API_URL = process.env.MODEL_API_URL || 'http://localhost:5000/api/model/predict';

const predictFakeNews = async (text) => {
  try {
    logger.info(`Sending text to model API at ${MODEL_API_URL}`);
    const response = await axios.post(MODEL_API_URL, { text });

    if (response.status !== 200 || !response.data) {
      throw new Error('Invalid response from model service');
    }
    
    logger.info('Received prediction from model API');
    return response.data;
  } catch (error) {
    if (error.response) {
      logger.error(`Model API error: ${error.response.status} ${error.response.statusText}`, error.response.data);
    } else {
      logger.error('Model API connection error:', error.message);
    }
    
    throw new Error('Model service failed'); 
  }
};

module.exports = { predictFakeNews };
