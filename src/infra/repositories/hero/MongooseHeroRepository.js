const Async = require('crocks/Async');

const MongooseHeroRepository = ({
  HeroModel,
}) => ({
  add: (heroData) => Async((reject, resolve) => {
    const { fromPromise } = Async;
    const createHero = fromPromise(HeroModel.create());
    return createHero(heroData).fork(reject, resolve);
  }),
  getAll: () => Async((reject, resolve) => {
    const { fromPromise } = Async;
    const getAllHeros = fromPromise(HeroModel.findAll());
    return getAllHeros().fork(reject, resolve);
  }),
});

module.exports = MongooseHeroRepository;
