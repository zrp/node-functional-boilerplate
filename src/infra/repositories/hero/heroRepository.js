const { fromPromise, Rejected, Resolved } = require('crocks/Async');
const resultToAsync = require('crocks/Async/resultToAsync');
const isEmpty = require('crocks/core/isEmpty');
const ifElse = require('crocks/logic/ifElse');
const {
  toDatabase,
  toDomainObject,
  toSuccess,
} = require('./MongooseHeroMapper');
const { tenantConnection, getModel } = require('./utils');

const rejectNotFound = () => Rejected({ message: 'NotFoundError' });

const handleNotFoundError = ifElse(isEmpty, rejectNotFound, Resolved);

const MongooseHeroRepository = ({
  database: {
    connections,
  },
  HeroModel,
}) => (tenantId) => {
  const connection = tenantConnection(connections)(tenantId);
  const model = getModel(connection, HeroModel);

  return {
    add: (heroData) => {
      const createHero = fromPromise((data) => model
        .create(toDatabase(data)));
      return createHero(heroData)
        .map(toDomainObject)
        .chain(resultToAsync);
    },
    getAll: () => {
      const getAllHeroes = fromPromise(() => model.find());

      return getAllHeroes();
    },
    delete: (heroId) => {
      const deleteHero = fromPromise((id) => model.findByIdAndDelete(id));
      return deleteHero(heroId)
        .chain(handleNotFoundError)
        .map(toSuccess);
    },
    getOne: (heroId) => {
      const getOneHero = fromPromise((id) => model.findById(id));
      return getOneHero(heroId)
        .chain(handleNotFoundError)
        .map(toDomainObject);
    },
    updateOne: (heroData) => {
      const updateOneHero = fromPromise((data) => model
        .findByIdAndUpdate(data.id, toDatabase(data), { new: true }));
      return updateOneHero(heroData)
        .chain(handleNotFoundError)
        .map(toDomainObject);
    },
  };
};

module.exports = MongooseHeroRepository;
