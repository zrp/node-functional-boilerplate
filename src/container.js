const {
  createContainer, asFunction, asValue, Lifetime,
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

const {
  database,
  Hero: HeroModel,
} = require('./infra/database/models');

const {
  HeroDomainService,
  HeroDomainFactory,
} = require('./domain/hero');

<<<<<<< HEAD
=======
// Infra layer imports

const {
  database,
  Hero: HeroModel,
} = require('./infra/database/models');

const MongooseHeroRepository = require('./infra/repositories/hero/MongooseHeroRepository');

const { loggerFactory } = require('./infra/logging/logger');

>>>>>>> 7f8b40a... refactor(logger): refactor Logger
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
    resolvers: asFunction(resolvers).singleton(),
    rootRouter: asFunction(rootRouter).singleton(),
    server: asFunction(server).singleton(),
    typeDefs: asFunction(typeDefs).singleton(),
    v1Router: asFunction(v1Router).singleton(),
  })
  // Infra Layer Registration
  .register({
    database: asValue(database),
    HeroModel: asValue(HeroModel),
  });

// Register Logger
const logger = container.build(asFunction(loggerFactory));

// eslint-disable-next-line fp/no-unused-expression
container.register({
  logger: asValue(logger),
});

module.exports = container;
