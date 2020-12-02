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
    const getAllHeroes = fromPromise(() => HeroModel.find());
    return getAllHeroes()
      .map(toDomainObject);
  },
  delete: (heroId) => {
    const deleteHero = fromPromise((id) => HeroModel.findByIdAndDelete(id));
    return deleteHero(heroId).map(toDomainObject);
  },
  getOne: (heroId) => {
    const getHero = fromPromise((id) => HeroModel.findById(id));
    return getHero(heroId).map(toDomainObject);
  },
  updateOne: (heroId, heroData) => {
    const updateHero = fromPromise((id, data) => HeroModel.findByIdAndUpdate(
      id,
      toDatabase(data),
      { new: true },
    ));
    return updateHero(heroId, heroData).map(toDomainObject);
  },
});

module.exports = MongooseHeroRepository;
