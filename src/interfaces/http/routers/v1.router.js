const { Router } = require('express');

module.exports = ({
  apollo,
  config: { apollo: apolloConfig },
  httpOptionsMiddleware,
  healthCheckHandler,
  heroController,
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
    .use('/hero', heroController.router);
};
