const container = require('./src/container');

const app = container.resolve('application');
const logger = container.resolve('logger');

module.exports = app
  .then(() => logger.info('Application successfully initialized!'))
  .catch((error) => logger.error(`Application failed to initialize due to ${error.message}!`));
