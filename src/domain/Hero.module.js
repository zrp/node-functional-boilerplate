const Joi = require('@hapi/joi');

module.exports = ({
  EnumsEntity: { PowerLevel },
}) => ({
  validate(heroData) {
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
    const { error: ERROR, value: OK } = heroSchema.validate(heroData);
    return {
      OK,
      ERROR,
    };
  },
  canHandleTheThreat(heroData, theatLvl) {
    return heroData.powerLevel >= theatLvl;
  },
});
