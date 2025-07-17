const mongoose = require('mongoose');
const logger = require('../utils/logger');

// This object will hold our cached database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * A more robust, serverless-friendly function to connect to MongoDB.
 * It uses a cached connection to avoid creating a new connection for every API request.
 */
const connectDB = async () => {
  // If we have a cached connection, reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      logger.info('New MongoDB connection established.');
      return mongoose;
    }).catch(err => {
      logger.error('MongoDB connection error:', err);
      throw err; // Rethrow error to be caught by the caller
    });
  }
  
  // Wait for the connection promise to resolve
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
