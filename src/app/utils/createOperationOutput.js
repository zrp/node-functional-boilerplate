const compose = require('crocks/helpers/compose');
const setProp = require('crocks/helpers/setProp');
const objOf = require('crocks/helpers/objOf');

const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

const createErr = (message) => (details) => ({ message, details });

const buildError = buildResult('error', true);

const buildSuccess = buildResult('result', false);

module.exports = {
  buildSuccess,
  buildError,
  createErr,
};
