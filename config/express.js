const env = require('env-var');

module.exports = {
  port: env.get('PORT').required().asPortNumber(),
  corsOrigin: env.get('CORS_ORIGIN').required().asString(),
  corsHeaders: env.get('CORS_HEADERS').required().asString(),
  corsMethods: env.get('CORS_METHODS').required().asString(),
  corsExposeHeaders: env.get('CORS_EXPOSE_HEADERS').required().asString(),
};
