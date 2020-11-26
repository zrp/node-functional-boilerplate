const Async = require('crocks/Async');

const {
  indexRoute,
  createRoute,
} = require('src/interfaces/http/controllers/hero/heroController');

const noop = () => [];

describe('Interfaces :: controllers :: hero :: HeroController', () => {
  describe('#indexRoute', () => {
    describe('when operation do not has error', () => {
      test('should return status 200 with serialized data', () => {
        const fakeRes = {
          status: (status) => ({
            json: (data) => ({
              status,
              data,
            }),
          }),
        };

        const nextNoop = noop;
        const reqNoop = noop;
        const fakeGetAllHeroes = Async.Resolved({
          result: ['I am Batman', 'I am Superman'],
        });
        const fakeHeroSerializer = (data) => data;
        const expectedMiddleware = indexRoute(fakeGetAllHeroes, fakeHeroSerializer);
        expect(expectedMiddleware(reqNoop, nextNoop, fakeRes)).toBe(fakeRes);
      });
    });
    describe('when operation has error', () => {});
  });

  describe('#createRoute', () => {
  });
});
