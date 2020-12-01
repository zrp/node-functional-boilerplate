const { HeroDomainService } = require('../../../../src/domain/hero');

describe('Domain :: Hero :: HeroService', () => {
  describe('#addSuperPower', () => {
    const heroData = {
      superPowers: ['fly'],
      powerLevel: 'S',
      baseOperations: 'New York',
      weapon: 'Astral Hammer',
    };
    test('should add a new super power in hero domain object', () => {
      const expected = HeroDomainService.addSuperPower('super strength')(heroData);
      expect(expected).toStrictEqual({
        superPowers: ['fly', 'super strength'],
        powerLevel: 'S',
        baseOperations: 'New York',
        weapon: 'Astral Hammer',
      });
    });
  });
});
