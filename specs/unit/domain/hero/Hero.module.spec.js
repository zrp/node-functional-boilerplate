const { Ok, Err } = require('crocks/Result');
const resultToObject = require('specs/support/resultToObject');
const { HeroDomainFactory } = require('../../../../src/domain/hero');

describe('Domain :: hero :: HeroModule', () => {
  describe('HeroDomainFactory', () => {
    describe('When pass a invalid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          name: 'Super Lhama',
          powerLevel: 'S',
          baseOperations: 'New York',
          weapon: 'Sword of Omens',
        };
        const isValid = HeroDomainFactory(heroData);
        const expected = {
          error: {
            message: 'ValidationError',
            details: [
              '"weapon" with Sword of Omens is invalid, expected type is: Weapon',
            ],
          },
          hasError: true,
        };

        expect(resultToObject(isValid)).toStrictEqual(expected);
      });
    });
    describe('When pass a valid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          powerLevel: 'S',
          baseOperations: 'New York',
          name: 'Super Lhama',
          weapon: 'Astral Hammer',
        };
        const isValid = HeroDomainFactory(heroData);
        const expected = isValid.equals(Ok(heroData));
        expect(expected).toBeTruthy();
      });
    });
  });
});
