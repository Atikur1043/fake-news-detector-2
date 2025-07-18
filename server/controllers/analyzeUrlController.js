const connectDB = require('../config/db');
const axios = require('axios');
const cheerio = require('cheerio');
const { predictFakeNews } = require('../services/modelService');
const Analysis = require('../models/Analysis');
const logger = require('../utils/logger');

const analyzeUrl = async (req, res, next) => {
  await connectDB();
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(html);
    const title = $('title').text();
    let articleText = '';
    $('p').each((i, elem) => {
      articleText += $(elem).text() + '\n';
    });
    const extractedText = (title + '\n' + articleText).trim();

    if (extractedText.length === 0) {
      return res.status(400).json({ error: 'Could not extract readable text from the URL.' });
    }

    const { prediction, confidence } = await predictFakeNews(extractedText);

    const newAnalysis = new Analysis({
      text: extractedText,
      prediction,
      confidence,
      user: req.user._id,
    });
    await newAnalysis.save();
    
    logger.info(`URL Analysis by user ${req.user.username} saved with ID: ${newAnalysis._id}`);

    res.status(200).json({
      _id: newAnalysis._id,
      text: extractedText,
      prediction: newAnalysis.prediction,
      confidence: newAnalysis.confidence,
      explanation: `Model predicts the article is likely ${prediction} with ${(confidence * 100).toFixed(1)}% confidence.`
    });

  } catch (error) {
    logger.error('URL Analysis controller error:', error.message);
    if (error.isAxiosError) {
      return res.status(400).json({ error: 'Failed to fetch content from the provided URL.' });
    }
    next(error);
  }
};

module.exports = { analyzeUrl };
