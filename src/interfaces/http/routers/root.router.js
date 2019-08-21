const { Router } = require('express');

module.exports = ({
  corsMiddleware,
  loggerMiddleware,
  v1Router,
}) => Router()
  .use(corsMiddleware())
  .use(loggerMiddleware)
  .use('/v1', v1Router);
