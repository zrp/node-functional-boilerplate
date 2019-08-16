const express = require('express');

class Server {
  constructor({
    config,
    router,
    logger,
  }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const port = process.env.EXPRESS_PORT || '80';
      this.express
        .listen(port, () => {
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
