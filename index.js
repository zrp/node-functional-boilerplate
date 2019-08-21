/* eslint-disable fp/no-unused-expression */
const container = require('./src/container');

const app = container.resolve('app');

app
  .start()
  .catch((error) => app
    .logger
    .error(error.stack)
    .then(() => process.exit(1)));
