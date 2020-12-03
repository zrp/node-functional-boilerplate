const { Types: { ObjectId } } = require('mongoose');
const cleanDatabase = require('specs/support/cleanDatabase');
const factory = require('specs/support/factory');
const heroRepository = require('src/infra/repositories/hero/heroRepository.js');
const {
  Hero: HeroModel,
} = require('src/infra/database/models');
const resultToObject = require('specs/support/resultToObject');
const chance = require('chance').Chance();

const HeroRepository = heroRepository({ HeroModel });

describe('Infra :: Hero :: MongooseHeroRepository', () => {
  beforeEach((done) => cleanDatabase(done));

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
          const { ok, error } = resultToObject(res);

          expect(ok).toStrictEqual({
            ...heroes[index],
          });
          expect(error).toBeUndefined();
        });
      });
    });

    describe('When there\'s no heroes', () => {
      test('should return no heroes', async () => {
        const result = await HeroRepository.getAll().toPromise();

        expect(result).toHaveLength(0);
      });
    });
  });

  describe('#getOne', () => {
    let hero;

    describe('When there\'s a hero for the id provided', () => {
      beforeEach(async () => {
        hero = await factory.create('hero');
      });

      test('should return an existent hero', async () => {
        const result = await HeroRepository.getOne(hero.name).toPromise();

        expect(result).toEqualOk(HeroDomainFactory(hero));
      });
    });

    describe('When there\'s no hero for the id provided', () => {
      test('should return no hero', async () => {
        const randomName = chance.name();
        const result = await HeroRepository.getOne(randomName).toPromise();

        expect(result).toBeNull();
      });
    });
  });

  describe('#updateOne', () => {
    let hero;

    describe('When there\'s actually a hero', () => {
      beforeEach(async () => {
        hero = await factory.create('hero');
      });

      test('should update an existent hero', async () => {
        const payload = {
          name: 'Super Lhama',
          superPowers: ['Acid Split'],
          powerLevel: 'S',
          baseOperations: 'Peru',
          weapon: 'Astral Hammer',
        };
        const result = await HeroRepository.updateOne(hero.id, payload).toPromise();

        expect(resultToObject(result).ok).toStrictEqual({
          id: expect.any(String),
          ...payload,
        });
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

        const { ok, error } = resultToObject(result);

        expect(ok).toStrictEqual({
          id: expect.any(String),
          ...payload,
        });
        expect(error).toBeUndefined();
      });
    });

    describe('When invalid hero data', () => {
      const payload = {
        name: 'Super Lhama',
        superPowers: ['Acid Split'],
        powerLevel: 'W',
        baseOperations: 'Peru',
        weapon: 'Astral Hammer',
      };

      test('should throw a mongoose error', async () => {
        await expect(HeroRepository.add(payload).toPromise())
          .rejects.toThrow('Hero validation failed: powerLevel: `W` is not a valid enum value for path `powerLevel`.');
      });
    });
  });

  describe('#delete', () => {
    let heroes;

    beforeEach(async () => {
      heroes = await factory.createMany('hero', 3);
    });

    describe('When hero exist', () => {
      test('should return success', async () => {
        const { id } = heroes[0];
        const result = await HeroRepository.delete(id).toPromise();
        const allHeroes = await HeroModel.find();

        const { ok, error } = resultToObject(result);

        expect(ok).toStrictEqual({
          success: true,
        });
        expect(error).toBeUndefined();
        expect(allHeroes).toHaveLength(2);
      });
    });

    describe('When hero no exists', () => {
      test('should return an error', async () => {
        const randomId = ObjectId().toString();
        return expect(HeroRepository.delete(randomId).toPromise())
          .rejects.toStrictEqual({ message: 'NotFoundError' });
      });
    });
  });

  describe('#getOne', () => {
    let heroes;

    beforeEach(async () => {
      heroes = await factory.createMany('hero', 3);
    });

    describe('When hero exist', () => {
      test('should return success', async () => {
        const [hero] = heroes;
        const result = await HeroRepository.getOne(hero.id).toPromise();

        const { ok, error } = resultToObject(result);

        expect(ok).toStrictEqual({
          ...hero,
        });
        expect(error).toBeUndefined();
      });
    });

    describe('When hero no exists', () => {
      test('should return an error', () => {
        const randomId = ObjectId().toString();
        return expect(HeroRepository.getOne(randomId).toPromise())
          .rejects.toStrictEqual({ message: 'NotFoundError' });
      });
    });
  });

  describe('#update', () => {
    let heroes;

    beforeEach(async () => {
      heroes = await factory.createMany('hero', 3);
    });

    describe('When hero exist', () => {
      test('should return success', async () => {
        const [hero] = heroes;
        const updatePayload = {
          ...hero,
          name: 'Name Updated',
        };
        const result = await HeroRepository.updateOne(updatePayload).toPromise();

        const { ok, error } = resultToObject(result);

        expect(ok).toStrictEqual({
          ...updatePayload,
        });
        expect(error).toBeUndefined();
      });
    });

    describe('When hero no exists', () => {
      test('should return an error', async () => {
        const randomId = ObjectId().toString();
        return expect(HeroRepository.updateOne(randomId).toPromise())
          .rejects.toStrictEqual({ message: 'NotFoundError' });
      });
    });
  });

  describe('#delete', () => {
    let hero;

    describe('When delete a hero', () => {
      beforeEach(async () => {
        hero = await factory.create('hero');
      });

      test('should return an ok deleted hero', async () => {
        const result = await HeroRepository.delete(hero.name).toPromise();

        expect(result).toEqualOk(HeroDomainFactory(hero));
      });
    });

    describe('When there\'s no hero to delete', () => {
      test('should return an ok deleted hero', async () => {
        const randomName = chance.name();
        const result = await HeroRepository.delete(randomName).toPromise();

        expect(result).toBeNull();
      });
    });
  });
});
