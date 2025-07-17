const mongoose = require('mongoose');
const logger = require('../utils/logger');

// This object will hold our cached database connection to be reused across invocations.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * A serverless-friendly function to connect to MongoDB.
 * It uses a cached connection to avoid creating a new connection for every API request.
 */
const connectDB = async () => {
  // If we have a cached connection, reuse it.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      logger.info('New MongoDB connection established.');
      return mongoose;
    }).catch(err => {
      logger.error('MongoDB connection error:', err);
      // If the connection fails, we must clear the promise to allow for a retry.
      cached.promise = null; 
      throw err;
    });
  }
  
  // Wait for the connection promise to resolve.
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
