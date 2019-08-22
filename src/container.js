const {
  createContainer, asFunction, asValue,
} = require('awilix');

// Configuration imports
const config = require('../config');

// Interfaces layer imports
const {
  healthCheckHandler,
} = require('./interfaces/http/handlers');
const {
  corsMiddleware,
  httpOptionsMiddleware,
  loggerMiddleware,
} = require('./interfaces/http/middleware');
const {
  rootRouter,
  v1Router,
} = require('./interfaces/http/routers');
const apollo = require('./interfaces/http/graphQL/apollo');
const context = require('./interfaces/http/graphQL/context');
const resolvers = require('./interfaces/http/graphQL/resolvers');
const server = require('./interfaces/http/server');
const typeDefs = require('./interfaces/http/graphQL/typeDefs');

// Application layer imports
const application = require('./app/application');

// Domain layer imports
/*
 * Imports here
 */

// Infra layer imports
const {
  mongoose,
} = require('./infra/databases/mongo');

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
    apollo: asFunction(apollo).singleton(),
    context: asFunction(context).singleton(),
    corsMiddleware: asFunction(corsMiddleware).singleton(),
    healthCheckHandler: asFunction(healthCheckHandler).singleton(),
    httpOptionsMiddleware: asFunction(httpOptionsMiddleware).singleton(),
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
    resolvers: asFunction(resolvers).singleton(),
    rootRouter: asFunction(rootRouter).singleton(),
    server: asFunction(server).singleton(),
    typeDefs: asFunction(typeDefs).singleton(),
    v1Router: asFunction(v1Router).singleton(),
  })
  // Application layer registrations
  .register({
    app: asFunction(application).singleton(),
  })
  // Domain layer registrations
  .register({

  })
  // Infra layer registrations
  .register({
    mongoDb: asFunction(mongoose).singleton(),
    logger: asValue(console),
  });
