const Joi = require('@hapi/joi');

module.exports = ({
  EnumsEntity: { PowerLevel },
}) => {
  const powerLevelEnum = Object.keys(PowerLevel);

  const heroSchema = Joi.object().keys({
    name: Joi
      .string()
      .alphanum()
      .required(),
    superpower: Joi
      .string()
      .required(),
    powerLevel: Joi
      .string()
      .valid(powerLevelEnum)
      .required(),
    baseOperations: Joi
      .string(),
  });

  return {
    validate: (hero) => {
      // Do validation calling Joi
      //
      // Should return Result.OK or Result.ERROR
    },

    addHero: (hero) => {
      // Recommendations:
      //
      // Maybe inject repositories here to
      // centralize adding hero rule in domain.
      // Not coupled because it is injected already,
      // it only calls repo protocol, doesn't know
      // impl.
      //
      // Should resolve an call to repo, resolving
      // or rejecting accordinly.
      //
      // Should call validate here and validate
      // from Villains module.
    },
  };
};
