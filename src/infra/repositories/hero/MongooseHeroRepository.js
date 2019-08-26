const { fromPromise } = require('crocks/Async');

const MongooseHeroRepository = ({
  HeroModel,
}) => ({
  add: (heroData) => {
    const createHero = fromPromise((data) => HeroModel.create(data));
    return createHero(heroData);
  },
  getAll: () => {
    const getAllHeros = fromPromise(() => HeroModel.find());
    return getAllHeros();
  },
});

module.exports = MongooseHeroRepository;
