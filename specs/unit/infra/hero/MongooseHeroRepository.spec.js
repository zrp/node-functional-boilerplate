const factory = require('specs/support/factory');
const heroRepository = require('src/infra/repositories/hero/heroRepository.js');
const {
  Hero: HeroModel,
} = require('src/infra/database/models');
const { HeroDomainFactory } = require('src/domain/hero');
const resultToObject = require('specs/support/resultToObject');

const HeroRepository = heroRepository({ HeroModel });

describe('Infra :: Hero :: MongooseHeroRepository', () => {
  describe('#getAll', () => {
    let heroes;

    describe('When there\'s heroes', () => {
      beforeEach(async () => {
        heroes = await factory.createMany('hero', 3);
      });

      test('should return all heroes', async () => {
        const result = await HeroRepository.getAll().toPromise();

        expect(result).toHaveLength(3);
        result.forEach((res, index) => {
          expect(res).toEqualOk(HeroDomainFactory(heroes[index]));
        });
      });
    });

    describe('When there\'s no heroes', () => {
      test('should return all heroes', async () => {
        const result = await HeroRepository.getAll().toPromise();

        expect(result).toHaveLength(0);
      });
    });
  });

  describe('#add', () => {
    describe('When valid hero data', () => {
      const payload = {
        name: 'Super Lhama',
        superPowers: ['Acid Split'],
        powerLevel: 'S',
        baseOperations: 'Peru',
        weapon: 'Astral Hammer',
      };

      test('should return the created hero', async () => {
        const result = await HeroRepository.add(payload).toPromise();
        expect(resultToObject(result).ok).toStrictEqual({
          id: expect.any(String),
          ...payload,
        });
      });
    });

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('When invalid hero data', () => {
      const payload = {
        name: 'Super Lhama',
        superPowers: ['Acid Split'],
        powerLevel: 'W',
        baseOperations: 'Peru',
        weapon: 'Astral Hammer',
      };

      test('should throw a mongoose error', async () => {
        expect(await HeroRepository.add(payload).toPromise())
          .toThrow(/'ValidationError: Hero validation failed: powerLevel: `W` is not a valid enum value for path `powerLevel`./);
      });
    });
  });
});
