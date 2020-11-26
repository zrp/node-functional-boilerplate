const { printDevMessage } = require('src/infra/logging/logger.js');
const maybeToArray = require('crocks/Maybe/maybeToArray');

describe('Infra :: logging :: loger.js', () => {
  describe('#printDevMessage', () => {
    describe('When message has a stack', () => {
      test('should return a correct string Value', () => {
        const info = {
          stack: 'Error in File',
          message: {
            type: 'error',
            message: 'Error',
          },
          timestamp: '2020-11-26 15:37:09',
          label: 'node-functional-boilerplate',
          level: 'debug',
        };
        const [expected] = maybeToArray(printDevMessage(info));
        expect(expected).toBe('2020-11-26 15:37:09 [node-functional-boilerplate] debug: {"type":"error","message":"Error"}\nSTACK: Error in File');
      });
    });
    describe('When message not has a stack', () => {
      test('should return a correct string Value', () => {
        const info = {
          message: {
            type: 'error',
            message: 'Error',
          },
          timestamp: '2020-11-26 15:37:09',
          label: 'node-functional-boilerplate',
          level: 'debug',
        };
        const [expected] = maybeToArray(printDevMessage(info));
        expect(expected).toBe('2020-11-26 15:37:09 [node-functional-boilerplate] debug: {"type":"error","message":"Error"}');
      });
    });
    describe('When receives a invalid object', () => {
      test('should return a Nothing with a empty array', () => {
        const info = {};
        const expected = maybeToArray(printDevMessage(info));
        expect(expected).toStrictEqual([]);
      });
    });
    describe('When receives null', () => {
      test('should return a Nothing with a empty array', () => {
        const info = undefined;
        const expected = maybeToArray(printDevMessage(info));
        expect(expected).toStrictEqual([]);
      });
    });
    describe('When receives undefined', () => {
      test('should return a Nothing with a empty array', () => {
        const info = null;
        const expected = maybeToArray(printDevMessage(info));
        expect(expected).toStrictEqual([]);
      });
    });
  });
});
