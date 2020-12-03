const Status = require('http-status');

module.exports = ({
  logger,
}) => (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // eslint-disable-next-line fp/no-unused-expression
  logger.error(err).run();

  const hasAlreadySended = res.headersSent;
  const sendInternalError = () => res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: err.message,
  });

  return hasAlreadySended ? false : sendInternalError();
};
