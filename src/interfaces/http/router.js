const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({
  config,
  apollo,
  loggerMiddleware,
  loggerAuditMiddleware,
}) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerAuditMiddleware);
    router.use(loggerMiddleware);
  }

  // CORS
  router.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.WL_CORS_ORIGIN,
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      process.env.WL_CORS_HEADERS,
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      process.env.WL_CORS_METHODS,
    );
    res.setHeader(
      'Access-Control-Expose-Headers',
      process.env.WL_CORS_EXPOSE_HEADERS,
    );
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  const apiRouter = Router();

  apiRouter.use(bodyParser.json());

  router.use('/v1', apiRouter);
  router.get('/v1/clients/status', (_, res) => {
    res.json({ status: 200, message: 'Hello! I am here.' });
  });

  apollo.applyMiddleware({
    app: router,
    path: '/v1/clients',
  });

  return router;
};
