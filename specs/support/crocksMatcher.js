const either = require('crocks/pointfree/either');
const compose = require('crocks/helpers/compose');
const setProp = require('crocks/helpers/setProp');
const objOf = require('crocks/helpers/objOf');

// eslint-disable-next-line import/no-extraneous-dependencies
const diff = require('jest-diff').default;

const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

const createOutput = either(
  buildResult('error', true),
  buildResult('ok', false),
);

module.exports = {
  toEqualOk: (received, expected) => {
    const { ok: receivedOk } = createOutput(received);
    const { ok: expectedOk } = createOutput(expected);

    const pass = hasError && received.equals(expected);
    return {
      pass,
      message: () => {
        const diffString = receivedOk
          ? diff(expectedOk, receivedOk)
          : received.inspect();
        return `expected a Ok instance received:\n ${diffString}`;
      },
    };
  },
  toEqualErr: (received, expected) => {
    const { error: receivedError } = createOutput(received);
    const { error: expectedError } = createOutput(expected);

    const pass = received.equals(expected);
    return {
      pass,
      message: () => {
        const diffString = receivedError
          ? diff(receivedError, expectedError)
          : received.inspect();
        return `expected Err instance to be equal:\n ${diffString}`;
      },
    };
  },
};
