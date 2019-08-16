const express = require('express')();
const { pipe } = require('sanctuary');

const disableHeaders = (app) => app.disable('x-powered-by');
const configureRouter = (router) => (app) => app.use(router);
const startExpress = (logger) => (port) => (app) => app.listen(port,
  () => logger.info(`[p ${process.pid}] Listening at port ${port}`));

const Server = ({
  router,
  logger,
}) => ({
  start: ({ port }) => new Promise((resolve) => resolve(
    pipe(
      disableHeaders,
      configureRouter(router),
      startExpress(logger)(port),
    )(express),
  )),
});

module.exports = Server;
