const { fromPromise, Rejected, Resolved } = require('crocks/Async');
const isEmpty = require('crocks/core/isEmpty');
const ifElse = require('crocks/logic/ifElse');
const {
  toDatabase,
  toDomainObject,
  toSuccess,
} = require('./MongooseHeroMapper');

const rejectNotFound = () => Rejected({ message: 'NotFoundError' });

const handleNotFoundError = ifElse(isEmpty, rejectNotFound, Resolved);

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
    return deleteHero(heroId)
      .chain(handleNotFoundError)
      .map(toSuccess);
  },
  getOne: (heroId) => {
    const getOneHero = fromPromise((id) => HeroModel.findById(id));
    return getOneHero(heroId)
      .chain(handleNotFoundError)
      .map(toDomainObject);
  },
  updateOne: (heroData) => {
    const updateOneHero = fromPromise((data) => HeroModel
      .findByIdAndUpdate(data.id, toDatabase(data), { new: true }));
    return updateOneHero(heroData)
      .chain(handleNotFoundError)
      .map(toDomainObject);
  },
});

module.exports = MongooseHeroRepository;
