const either = require('crocks/pointfree/either');
const compose = require('crocks/helpers/compose');
const setProp = require('crocks/helpers/setProp');
const objOf = require('crocks/helpers/objOf');

const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

/**
 * @typedef ResultAsObject
 * @type {object}
 * @property {object} ok Contains the data from result
 * @property {object} error Contains the data from result if there's an error
 */

/**
 * @param {object} result A crocks result
 * @returns {ResultAsObject}
 */
const toObject = either(
  buildResult('error', true),
  buildResult('ok', false),
);

module.exports = toObject;
