const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
