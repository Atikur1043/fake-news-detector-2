require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Ensure the database is connected when the function is invoked
connectDB();

const app = express();

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

// NOTE: The app.listen() block has been removed for Vercel compatibility.

// Export the app for Vercel's serverless environment
module.exports = app;
