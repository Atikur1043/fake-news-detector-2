require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// FIX: Corrected the path to the errorHandler middleware
const errorHandler = require('./middleware/errorHandler'); 
// FIX: Corrected the path to the logger utility
const logger = require('./utils/logger'); 

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/analyze-url', require('./routes/analyzeUrl'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/history', require('./routes/history'));

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
