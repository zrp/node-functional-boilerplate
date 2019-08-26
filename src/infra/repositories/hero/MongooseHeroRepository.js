const Async = require('crocks/Async');

const MongooseHeroRepository = ({
  heroModel,
}) => ({
  add: (heroData) => Async((reject, resolve) => {
    const { fromPromise } = Async;
    const createHero = fromPromise(heroModel.create());
    return createHero(heroData).fork(reject, resolve);
  }),
  getAll: () => Async((reject, resolve) => {
    const { fromPromise } = Async;
    const getAllHeros = fromPromise(heroModel.findAll());
    return getAllHeros().fork(reject, resolve);
  }),
});

module.exports = MongooseHeroRepository;
