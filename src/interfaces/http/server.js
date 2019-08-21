const express = require('express')();
// const { pipe } = require('sanctuary');

// module.exports = ({
//   router,
//   logger,
// }) => {
//   const disableHeaders = (app) => app.disable('x-powered-by');
//   const configureRouter = (app) => app.use(router);
//   const startExpress = ({ port }) => (app) => app.listen(port,
//     () => logger.info(`[p ${process.pid}] Listening at port ${port}`));

//   return {
//     start: (config) => new Promise((resolve) => resolve(
//       pipe(
//         disableHeaders,
//         configureRouter,
//         startExpress(config),
//       )(express),
//     )),
//   };
// };

module.exports = ({
  config,
  rootRouter,
  logger,
}) => {
  const {
    express: {
      port,
    },
  } = config;

  return {
    start: () => express
      .disable('x-powered-by')
      .use(rootRouter)
      .listen(port, () => logger.info(`[p ${process.pid}] Listening at port ${port}`)),
  };
};
