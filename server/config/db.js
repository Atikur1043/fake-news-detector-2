const mongoose = require('mongoose');
const logger = require('../utils/logger');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      logger.info('New MongoDB connection established.');
      return mongoose;
    }).catch(err => {
      logger.error('MongoDB connection error:', err);
      cached.promise = null; 
      throw err;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
