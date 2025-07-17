const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  // Add a reference to the User who owns this analysis
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Creates a link to the User model
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  prediction: {
    type: String,
    required: true,
    enum: ['real', 'fake', 'uncertain'],
  },
  confidence: {
    type: Number,
    required: true,
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Analysis', analysisSchema);
