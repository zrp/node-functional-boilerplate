const { Router } = require('express');

module.exports = ({
  corsMiddleware,
  loggerMiddleware,
  v1Router,
}) => Router()
  // TODO add helmet
  .use(corsMiddleware())
  .use(loggerMiddleware)
  .use('/v1', v1Router);
