const mongoose = require('mongoose');

/**
 * Defines the schema for user feedback.
 * Each feedback document is now linked to a specific analysis document.
 */
const feedbackSchema = new mongoose.Schema({
  // Link to the specific analysis document using its ObjectId
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis', // This creates a reference to the Analysis model
    required: [true, 'An analysis ID is required for feedback.'],
  },
  // This field is for the user's opinion on the prediction's correctness.
  // The "Report Incorrect" button will send `false`.
  isCorrect: {
    type: Boolean,
    required: true,
  },
  // Optional field for future use, like a comment box
  userComment: {
    type: String,
    trim: true,
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Feedback', feedbackSchema);
