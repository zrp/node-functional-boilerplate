const { HeroDomainFactory } = require('src/domain/hero');

const MongooseHeroMapper = {
  toDomainObject({
    superPowers,
    powerLevel,
    baseOperations,
    weapon,
  }) {
    return HeroDomainFactory({
      superPowers,
      powerLevel,
      baseOperations,
      weapon,
    });
  },

  toDatabase({
    superPowers,
    powerLevel,
    baseOperations,
    weapon,
  }) {
    return {
      superPowers,
      powerLevel,
      baseOperations,
      weapon,
    };
  },
};

module.exports = MongooseHeroMapper;
