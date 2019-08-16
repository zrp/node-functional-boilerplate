const {
  createContainer,
} = require('awilix');
// const { scopePerRequest } = require('awilix-express');

// const Server = require('./interfaces/http/Server');
// const router = require('./interfaces/http/router');
// const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
// const errorHandler = require('./interfaces/http/errors/errorHandler');
// const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
// const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

// const Application = require('./app/Application');

// const { logger } = require('./infra/logging/logger');

// const config = require('../config');

const container = createContainer();

module.exports = container;
