const either = require('crocks/pointfree/either');
const compose = require('crocks/helpers/compose');
const setProp = require('crocks/helpers/setProp');
const objOf = require('crocks/helpers/objOf');

const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

const createOutput = either(
  buildResult('error', true),
  buildResult('result', false),
);

module.exports = createOutput;
