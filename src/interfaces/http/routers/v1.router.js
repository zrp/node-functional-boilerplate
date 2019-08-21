const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({
  apollo,
  config: { apollo: apolloConfig },
  httpOptionsMiddleware,
  healthCheckHandler,
}) => {
  const router = Router()
    .use(bodyParser.json())
    .use(httpOptionsMiddleware)
    .get('/status', healthCheckHandler);

  // eslint-disable-next-line fp/no-unused-expression
  apollo.applyMiddleware({
    app: router,
    path: `/${apolloConfig.route}`,
  });

  return router;
};
