const curry = require('crocks/helpers/curry');
const getPropOr = require('crocks/helpers/getPropOr');
const Status = require('http-status');

const resolveAndSend = curry((res, status, data) => res.status(status).json(data));
const rejectAndNext = curry((next, error) => next(error));

const resolveValidationError = curry((res, error) => res
  .status(Status.BAD_REQUEST)
  .json({
    type: 'ValidationError',
    details: error.details,
  }));

const resolveNotFoundError = curry((res, error) => res
  .status(Status.BAD_REQUEST)
  .json({
    type: 'NotFoundError',
    details: error.details,
  }));

const executeErrorHandler = (error, res, next) => {
  const errorsMap = {
    NotFound: resolveNotFoundError(res),
    ValidationError: resolveValidationError(res),
  };

  const getErrorHandler = getPropOr(rejectAndNext(next));

  return getErrorHandler(error.message, errorsMap)(error);
};

module.exports = {
  executeErrorHandler,
  resolveNotFoundError,
  resolveValidationError,
  resolveAndSend,
};
