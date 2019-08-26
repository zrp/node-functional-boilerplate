const { fromPromise } = require('crocks/Async');

const MongooseHeroRepository = ({
  heroModel,
}) => ({
  add: (heroData) => {
    const createHero = fromPromise(heroModel.create);
    return createHero(heroData);
  },
  getAll: () => {
    const getAllHeros = fromPromise(heroModel.findAll);
    return getAllHeros();
  },
});

module.exports = MongooseHeroRepository;
