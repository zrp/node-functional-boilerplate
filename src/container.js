const Maybe = require('crocks/Maybe');

const {
  createContainer, asFunction, asValue, Lifetime,
} = require('awilix');

// Configuration imports
const config = require('../config');

const { isDevelopment } = require('./utils');

// Interfaces layer imports
const {
  healthCheckHandler,
  devErrorHandler,
  errorHandler,
} = require('./interfaces/http/handlers');

const apolloErrorHandler = require('./interfaces/http/graphQL/errorHandler');
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

const {
  database,
  Hero: HeroModel,
} = require('./infra/database/models');

const {
  HeroDomainService,
  HeroDomainFactory,
} = require('./domain/hero');

const { getLogger } = require('./infra/logging/logger');

const heroController = require('./interfaces/http/controllers/hero/heroController');
const heroSerializer = require('./interfaces/http/controllers/hero/heroSerializer');

const container = createContainer()
  .loadModules([
    'src/app/**/*.js',
    'src/infra/repositories/**/*.js',
    'src/interfaces/http/graphQL/resolvers/mutations/**/*.js',
    'src/interfaces/http/graphQL/resolvers/queries/**/*.js',
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      register: asFunction,
      lifetime: Lifetime.SINGLETON,
    },
  })
  // Configuration registration
  .register({
    config: asValue(config),
  })
  .register({
    heroDomainFactory: asValue(HeroDomainFactory),
    heroDomainService: asValue(HeroDomainService),
  })
  // Interfaces layer registrations
  .register({
    apollo: asFunction(apollo).singleton(),
    context: asFunction(context).singleton(),
    corsMiddleware: asFunction(corsMiddleware).singleton(),
    healthCheckHandler: asFunction(healthCheckHandler).singleton(),
    httpOptionsMiddleware: asFunction(httpOptionsMiddleware).singleton(),
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
    apolloErrorHandler: asFunction(apolloErrorHandler),
    resolvers: asFunction(resolvers).singleton(),
    rootRouter: asFunction(rootRouter).singleton(),
    server: asFunction(server).singleton(),
    typeDefs: asFunction(typeDefs).singleton(),
    v1Router: asFunction(v1Router).singleton(),
    errorHandler: asFunction(
      isDevelopment(Maybe.of(config.nodeEnv))
        ? devErrorHandler
        : errorHandler,
    ),
  })
  // Controllers
  .register({
    heroController: asFunction(heroController).singleton(),
  })
  // Serializer
  .register({
    heroSerializer: asValue(heroSerializer),
  })
  // Infra Layer Registration
  .register({
    database: asValue(database),
    HeroModel: asValue(HeroModel),
  });

// Register Logger
const logger = container.build(asFunction(getLogger));

// eslint-disable-next-line fp/no-unused-expression
container.register({
  logger: asValue(logger),
});

module.exports = container;
