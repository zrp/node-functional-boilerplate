const { Ok, Err } = require("crocks/Result");
const { HeroDomainFactory } = require('../../../../src/domain/hero');

describe('Domain :: hero :: HeroModule', () => {
  describe('HeroDomainFactory', () => {
    describe('When pass a invalid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          powerLevel: 'S',
          baseOperations: 'New York',
          weapon: 'Sword of Omens',
        };
        const isValid = HeroDomainFactory(heroData);
        const expected = isValid.equals(
          Err([
            '"weapon" with Sword of Omens is invalid, expected type is: Weapon',
          ])
        );
        expect(expected).toBeTruthy();
      });
    });
    describe('When pass a valid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          powerLevel: 'S',
          baseOperations: 'New York',
          weapon: 'Astral Hammer',
        };
        const isValid = HeroDomainFactory(heroData);
        const expected = isValid.equals(Ok(heroData));
        expect(expected).toBeTruthy();
      });
    });
  });
});