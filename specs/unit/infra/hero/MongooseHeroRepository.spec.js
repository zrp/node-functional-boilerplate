const factory = require('specs/support/factory');
const heroRepository = require('src/infra/repositories/hero/heroRepository.js');
const {
  Hero: HeroModel,
} = require('src/infra/database/models');
const { HeroDomainFactory } = require('src/domain/hero');

describe('Infra :: Hero :: MongooseHeroRepository', () => {
  describe('#getAll', () => {
    let hero;

    beforeEach(async () => {
      hero = await factory.create('hero');
    });

    test('should return a Async with add operation', async () => {
      const result = await heroRepository({ HeroModel }).getAll().toPromise();
      expect(result.toString()).toBe(HeroDomainFactory(hero).toString());
      // Result:
      // Expected: "Ok { superPowers: [ \"Fire Breath\" ], name: \"Nothing\", powerLevel: \"B\", weapon: \"Astral Hammer\", baseOperations: \"Just Function\", id: \"5fbfd35233275a00f08ee081\" }"
      // Received: "Ok { id: \"5fbfd35233275a00f08ee081\", name: \"Nothing\", superPowers: [ \"Fire Breath\" ], powerLevel: \"B\", baseOperations: \"Just Function\", weapon: \"Astral Hammer\" }"
    });
  });
});
