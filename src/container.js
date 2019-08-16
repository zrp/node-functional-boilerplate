const {
  createContainer, asFunction, asValue,
} = require('awilix');

// Configuration imports
const config = require('../config');

// Interfaces layer imports
const Server = require('./interfaces/http/Server');

// Application layer imports
const Application = require('./app/Application');

// Domain layer imports
/*
 * Imports here
 */

// Infra layer imports
/*
 * Imports here
 */

// const { scopePerRequest } = require('awilix-express');

// const router = require('./interfaces/http/router');
// const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
// const errorHandler = require('./interfaces/http/errors/errorHandler');
// const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
// const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

// const { logger } = require('./infra/logging/logger');

module.exports = createContainer()
  // Configuration registration
  .register({
    config: asValue(config),
  })
  // Interfaces layer registrations
  .register({
    server: asFunction(Server),
  })
  // Application layer registrations
  .register({
    app: asFunction(Application),
  })
  // Domain layer registrations
  .register({

  })
  // Infra layer registrations
  .register({

  });
