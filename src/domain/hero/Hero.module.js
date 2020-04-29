const createDomainFactory = require('../utils/createDomainFactory');

module.exports = () => {
  const heroSchema = {
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

  const {
    domain: HeroDomainFactory,
    createDomainValidate: createHeroDomainValidate,
  } = createDomainFactory(heroSchema);
  return {
    HeroDomainFactory,
    createHeroDomainValidate,
  };
};
