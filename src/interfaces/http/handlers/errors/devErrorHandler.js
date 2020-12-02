const Status = require('http-status');

module.exports = ({
  logger,
}) => (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // eslint-disable-next-line fp/no-unused-expression
  logger.error(err).run();
  return res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: err.message,
    stack: err.stack,
  });
};
