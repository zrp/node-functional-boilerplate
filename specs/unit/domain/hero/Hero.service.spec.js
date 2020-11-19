const { Ok, Err } = require("crocks/Result");
const { HeroDomainService } = require('../../../../src/domain/hero');

describe('Domain :: Hero', () => {
  describe('#validateHero', () => {
    describe('When pass a valid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          powerLevel: 'S',
          baseOperations: 'New York',
          weapon: 'Sword of Omens',
        };
        const isValid = HeroDomainService.validateHero(heroData);
        const expected = isValid.equals(
          Err([
            '"weapon" with Sword of Omens is invalid, expected type is: Weapon',
          ])
        );
        expect(expected).toBeTruthy();
      });
    });
    describe('When pass a invalid data', () => {
      test('should return a Crocks Result with a Err instance', () => {
        const heroData = {
          superPowers: ['fly'],
          powerLevel: 'S',
          baseOperations: 'New York',
          weapon: 'Astral Hammer',
        };
        const isValid = HeroDomainService.validateHero(heroData);
        const expected = isValid.equals(Ok(heroData));
        expect(expected).toBeTruthy();
      });
    });
  });
  describe('#addSuperPower', () => {
    const heroData = {
      superPowers: ['fly'],
      powerLevel: 'S',
      baseOperations: 'New York',
      weapon: 'Astral Hammer',
    };
    test('should add a new super power in hero domain object', () => {
      const expected = HeroDomainService.addSuperPower(heroData, 'super strength');
      expect(expected).toEqual({
        superPowers: ['fly', 'super strength'],
        powerLevel: 'S',
        baseOperations: 'New York',
        weapon: 'Astral Hammer',
      });
    });
  });
});
