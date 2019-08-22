const mongoose = require('mongoose');
const { assocPath, pipe } = require('ramda');

const configureLogging = (logger) => assocPath(['options', 'logging'], logger.info.bind(logger));

module.exports = ({
  logger,
}) => pipe(
  configureLogging(logger),
)(mongoose);
