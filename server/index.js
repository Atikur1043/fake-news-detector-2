require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// NOTE: We no longer connect to the DB here directly.
// Each request will ensure a connection is available via the controller.

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Export the app for Vercel's serverless environment
module.exports = app;
