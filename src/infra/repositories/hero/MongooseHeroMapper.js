const { HeroDomainFactory } = require('src/domain/hero');
const { Ok } = require('crocks/Result');
const ifElse = require('crocks/logic/ifElse');
const { Nothing } = require('crocks/Maybe');
const isArray = require('crocks/predicates/isArray');
const isDefined = require('crocks/core/isDefined');

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
  toSuccess() {
    return Ok({ success: true });
  },

  toDomainObject(entity) {
    const mapEntity = (data) => data.map(toDomain);

    const shouldMap = ifElse(isArray, mapEntity, toDomain);
    const hasData = ifElse(isDefined, shouldMap, Nothing);

    return hasData(entity);
  },

  toDatabase(entity) {
    const mapEntity = (data) => data.map(toDB);

    const shouldMap = ifElse(isArray, mapEntity, toDB);
    const hasData = ifElse(isDefined, shouldMap, Nothing);

    return hasData(entity);
  },
};

module.exports = MongooseHeroMapper;
