const env = require('env-var');

module.exports = {
  url: env.get('MONGO_DB_URL').required().asUrlString(),
};
