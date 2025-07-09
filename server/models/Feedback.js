const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  predictionId: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  userComment: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);