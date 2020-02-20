const createDomainFactory = (schema) => (params = {}) => {
  const keys = Object.keys(schema);


  const requiredValidation = () => {
    const missingRequired = keys.filter((k) => schema[k].required)
      .filter((param) => !(param in params));
    if (missingRequired.length) {
      return {
        valid: false,
        error: `Missing required parameter(s): ${missingRequired.join(', ')}`,
      };
    }

    return {
      valid: true,
      error: '',
    };
  };


  const domain = keys
    .reduce((obj, k) => ({ ...obj, [k]: params[k] }), {});

  return (validations = []) => {
    const result = [requiredValidation, ...validations].map((v) => v({ domain }))
      .reduce((acc, curr) => {
        const valid = acc.valid && curr.valid;
        const errors = curr.error ? [...acc.errors, curr.error] : acc.errors;
        return { valid, errors };
      }, { valid: true, errors: [] });

    return result;
  };
};

const superHeroSchema = {
  identity: {
    required: true,
  },
  superPower: {
    required: true,
  },
};

const identitySchema = {
  name: {
    required: true,
  },
};

const superPowerSchema = {
  name: {
    required: true,
  },
  description: {
    required: true,
  },
};


const identityFact = createDomainFactory(identitySchema);
const powerFact = createDomainFactory(superPowerSchema);
const superHeroFact = createDomainFactory(superHeroSchema);

const superHero = superHeroFact({
  identity: identityFact({
    name: 'Saitama',
  }),
  superPower: powerFact({
    name: 'One Punch',
    description: 'Defeat any enemy with only one punch',
  }),
});

const isSaitama = ({ domain }) => {
  const result = domain.name === 'Saitama';
  const error = result ? [] : 'It is not Saitama';
  return {
    valid: result,
    error,
  };
};


const isBatman = ({ domain }) => {
  const result = domain.name === 'Batima';
  const error = result ? [] : 'It is not Batima';
  return {
    valid: result,
    error,
  };
};


const isSuperman = ({ domain }) => {
  const result = domain.name === 'Superman';
  const error = result ? [] : 'It is not Superman';
  return {
    valid: result,
    error,
  };
};


const identity = identityFact({
  name: 'Saitama',
})([isSaitama, isBatman, isSuperman]);

console.info(identity);