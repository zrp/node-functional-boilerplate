const factory = require('specs/support/factory');
const heroRepository = require('src/infra/repositories/hero/heroRepository.js');
const {
  Hero: HeroModel,
} = require('src/infra/database/models');
const { Ok } = require('crocks/Result');

describe('Infra :: Hero :: MongooseHeroRepository', () => {
  describe('#getAll', () => {
    let hero;

    beforeEach(async () => {
      hero = await factory.create('hero');
    });

    test('should return a Async with add operation', async () => {
      const result = await heroRepository({ HeroModel }).getAll().toPromise();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchFuckingCrocksObject(hero);
      // result[0].chain((res) => {
      //   expect(res).toStrictEqual(hero);
      //   return Ok(res);
      // });
    });
  });
});
