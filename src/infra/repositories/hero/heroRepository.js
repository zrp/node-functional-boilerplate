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
  delete: (heroName) => {
    const deleteHero = fromPromise((name) => HeroModel.findOneAndDelete(name));
    return deleteHero(heroName).map(toDomainObject);
  },
  getOne: (heroName) => {
    const getHero = fromPromise((name) => HeroModel.findOne({ name }));
    return getHero(heroName).map(toDomainObject);
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
