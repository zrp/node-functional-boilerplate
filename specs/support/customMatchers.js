// eslint-disable-next-line import/no-extraneous-dependencies
const diff = require('jest-diff').default;
const resultToObject = require('./resultToObject');

module.exports = {
  toEqualOk: (received, expected) => {
    const { ok: receivedOk } = resultToObject(received);
    const { ok: expectedOk } = resultToObject(expected);

    const pass = received.equals(expected);
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
    const { error: receivedError } = resultToObject(received);
    const { error: expectedError } = resultToObject(expected);

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
