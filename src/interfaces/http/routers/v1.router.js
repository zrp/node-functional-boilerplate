const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({
  httpOptionsMiddleware,
  healthCheckHandler,
}) => Router()
  .use(bodyParser.json())
  .use(httpOptionsMiddleware)
  .get('/status', healthCheckHandler);
