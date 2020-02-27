const createDomainFactory = require('../utils/createDomainFactory');

module.exports = () => {
  const superHeroSchema = {
    name: {
      required: true,
      type: 'String',
    },
    superPower: {
      required: true,
      type: 'String',
    },
    powerLevel: {
      required: true,
      type: 'String',
    },
    baseOperations: {
      required: true,
      type: 'String',
    },
    weapon: {
      required: true,
      type: 'String',
    },
  };

  const { domain: heroDomain, createDomainValidate } = createDomainFactory(superHeroSchema);
  return {
    heroDomain,
    createDomainValidate,
  };
};
