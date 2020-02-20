const container = require('./src/container');

const app = container.resolve('app');
const logger = container.resolve('logger');

module.exports = app
  .then(() => logger.info(`[PID ${process.pid}] application succesfully initialized`))
  .catch((error) => logger.error(`[PID ${process.pid}] application failed to initialize: ${error.message}`));
