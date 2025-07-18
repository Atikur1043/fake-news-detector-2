const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis',
    required: [true, 'An analysis ID is required for feedback.'],
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  userComment: {
    type: String,
    trim: true,
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Feedback', feedbackSchema);
