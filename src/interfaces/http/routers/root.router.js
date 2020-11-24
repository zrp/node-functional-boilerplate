const { Router } = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = ({
  corsMiddleware,
  loggerMiddleware,
  v1Router,
}) => Router()
  .use(helmet())
  .use(bodyParser.json())
  .use(corsMiddleware())
  .use(loggerMiddleware)
  .use('/v1', v1Router);
