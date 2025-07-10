module.exports = (err, req, res, next) => {
  if (err.message.includes('Model service failed')) {
    return res.status(503).json({ 
      error: 'AI service unavailable',
      details: err.message 
    });
  }
  next(err);
};