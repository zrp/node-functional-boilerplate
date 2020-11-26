const { fromPromise } = require('crocks/Async');
const { toDatabase, toDomainObject } = require('./MongooseHeroMapper');

const MongooseHeroRepository = ({
  HeroModel,
}) => ({
  add: (heroData) => {
    const createHero = fromPromise((data) => HeroModel.create(data));
    return createHero(toDatabase(heroData));
  },
  getAll: () => {
    const getAllHeros = fromPromise(() => HeroModel.find());
    return getAllHeros().map(toDomainObject);
  },
});

module.exports = MongooseHeroRepository;
