const { HeroDomainFactory } = require('src/domain/hero');

const toDomain = (data) => {
  const {
    _id,
    superPowers,
    name,
    powerLevel,
    baseOperations,
    weapon,
  } = data.toObject();

  return HeroDomainFactory({
    id: _id.toString(),
    name,
    superPowers,
    powerLevel,
    baseOperations,
    weapon,
  });
};

const toDB = (data) => {
  const {
    name,
    superPowers,
    powerLevel,
    baseOperations,
    weapon,
  } = data;

  return {
    name,
    superPowers,
    powerLevel,
    baseOperations,
    weapon,
  };
};

const MongooseHeroMapper = {
  toDomainObject(entity) {
    if (!entity) return null;

    if (Array.isArray(entity)) {
      return entity.map(toDomain);
    }

    return toDomain(entity);
  },

  toDatabase(entity) {
    if (!entity) return null;

    if (Array.isArray(entity)) {
      return entity.map(toDB);
    }

    return toDB(entity);
  },
};

module.exports = MongooseHeroMapper;
