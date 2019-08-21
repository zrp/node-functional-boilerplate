const express = require('express')();

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
