const env = require('env-var');

module.exports = {
  route: env.get('APOLLO_ROUTE').required().asString(),
  introspection: env.get('APOLLO_INSTROSPECTION').required().asString(),
  playground: env.get('APOLLO_PLAYGROUND').required().asString(),
};
