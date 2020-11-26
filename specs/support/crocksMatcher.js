const either = require('crocks/pointfree/either');
const compose = require('crocks/helpers/compose');
const setProp = require('crocks/helpers/setProp');
const objOf = require('crocks/helpers/objOf');

const diff = require('jest-diff').default;

const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

const createOutput = either(
  buildResult('error', true),
  buildResult('ok', false),
);

module.exports = {
  toMatchFuckingCrocksObject: (received, expected) => {
    const { ok } = createOutput(received);

    const match = ok ? diff(expected, ok) : false;

    return {
      pass: match,
      message: 'SE FODEU',
    };
  },
};
