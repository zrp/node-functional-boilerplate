const { isDevelopment } = require('src/utils');
const { Just } = require('crocks/Maybe');

describe('Utils :: isDevelopment', () => {
  describe('when receives a Just with "development"', () => {
    test('should return true', () => {
      const env = Just('development');
      expect(isDevelopment(env)).toBeTruthy();
    });
  });
  describe('when not receives a Just with "development"', () => {
    test('should return false', () => {
      const env = Just('production');
      expect(isDevelopment(env)).toBeFalsy();
    });
  });
});
