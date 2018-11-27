const RateLimit = require('express-rate-limit');

const { NODE_ENV, SESSION_SECRET, PORT } = process.env;
const { DATABASE_URI } = require('./keys');

const CONFIG = {
  SESSION_SECRET,
  DATABASE_URI,
  limiter: new RateLimit({
    windowMs: 15 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  }),
  options: {
    port: PORT || 3000,
    endpoint: '/api',
    // disable playground in production
    playground: NODE_ENV === 'development' ? '/playground' : false
  }
};

module.exports = { ...CONFIG };
