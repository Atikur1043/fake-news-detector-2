require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/analyze-url', require('./routes/analyzeUrl'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/history', require('./routes/history'));

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
