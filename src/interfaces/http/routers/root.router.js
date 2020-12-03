const { Router } = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Maybe = require('crocks/Maybe');
const unit = require('crocks/helpers/unit');
const { isDevelopment } = require('src/utils');

module.exports = ({
  corsMiddleware,
  loggerMiddleware,
  v1Router,
  errorHandler,
  config,
}) => Router()
  .use(helmet({
    contentSecurityPolicy: isDevelopment(Maybe.of(config.nodeEnv))
      ? false
      : unit(),
  }))
  .use(bodyParser.json())
  .use(corsMiddleware())
  .use(loggerMiddleware)
  .use('/v1', v1Router)
  .use(errorHandler);
