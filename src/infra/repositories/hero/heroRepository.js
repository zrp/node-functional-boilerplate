const { fromPromise } = require('crocks/Async');
const { toDatabase, toDomainObject } = require('./MongooseHeroMapper');

const MongooseHeroRepository = ({
  HeroModel,
}) => ({
  add: (heroData) => {
    const createHero = fromPromise((data) => HeroModel.create(toDatabase(data)));
    return createHero(heroData)
      .map(toDomainObject);
  },
  getAll: () => {
    const getAllHeros = fromPromise(() => HeroModel.find());
    return getAllHeros()
      .map(toDomainObject);
  },
  delete: () => {
    const deleteHero = fromPromise(() => HeroModel.delete());
    return deleteHero();
  },
  getOne: () => {
    const deleteHero = fromPromise(() => HeroModel.findById());
    return deleteHero();
  },
  updateOne: () => {
    const deleteHero = fromPromise(() => HeroModel.updadeById());
    return deleteHero();
  },
});

module.exports = MongooseHeroRepository;
