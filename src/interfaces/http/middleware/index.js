const corsMiddleware = require('./cors.middleware');
const httpOptionsMiddleware = require('./httpOptions.middleware');
const loggerMiddleware = require('./logger.middleware');

module.exports = {
  corsMiddleware,
  httpOptionsMiddleware,
  loggerMiddleware,
};
