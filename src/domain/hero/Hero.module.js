const createDomainFactory = require('../utils/createDomainFactory');

module.exports = () => {
  const superHeroSchema = {
    name: {
      required: true,
    },
    superPower: {
      required: true,
    },
    powerLevel: {
      required: true,
    },
    baseOperations: {
      required: true,
    },
    weapon: {
      required: true,
    },
  };

  return createDomainFactory(superHeroSchema);
};
