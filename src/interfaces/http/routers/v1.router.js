const { Router } = require('express');
const { heroController } = require('src/interfaces/http/controllers/hero/heroController');

module.exports = ({
  apollo,
  config: { apollo: apolloConfig },
  httpOptionsMiddleware,
  healthCheckHandler,
}) => {
  const router = Router()
    .use(httpOptionsMiddleware)
    .get('/status', healthCheckHandler);

  // eslint-disable-next-line fp/no-unused-expression
  apollo.applyMiddleware({
    app: router,
    path: `/${apolloConfig.route}`,
  });

  return router
    .use('/hero', heroController);
};
