const createDomainFactory = (schema) => (params = {}) => {
  const keys = Object.keys(schema);

  const missingRequired = keys.filter((k) => schema[k].required)
    .filter((param) => !(param in params));

  if (missingRequired.length) {
    return new Error(`Missing required parameter(s): ${missingRequired.join(', ')}`);
  }

  const domainFactory = keys
    .reduce((obj, k) => ({ ...obj, [k]: params[k] }), {});

  return domainFactory;
};

module.exports = createDomainFactory;
