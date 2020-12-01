const Async = require('crocks/Async');
const unit = require('crocks/helpers/unit');

const {
  indexRoute,
  createRoute,
} = require('src/interfaces/http/controllers/hero/heroController');

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

        const nextNoop = unit;
        const reqNoop = unit;
        const fakeGetAllHeroes = Async.Resolved({
          result: ['I am Batman', 'I am Superman'],
        });
        const fakeHeroSerializer = (data) => data;
        const expectedMiddleware = indexRoute(fakeGetAllHeroes, fakeHeroSerializer);
        expect(expectedMiddleware(reqNoop, nextNoop, fakeRes)).toBe();
      });
    });
    describe('when operation has error', () => {});
  });

  describe('#createRoute', () => {
  });
});
