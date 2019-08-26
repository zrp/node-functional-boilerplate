const Joi = require('@hapi/joi');
const Result = require('crocks/Result');
const { isNil } = require('crocks/predicates');

const { Err, Ok } = Result;

module.exports = ({
  enumsEntity: { PowerLevel },
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
    validate(hero) {
      const { error } = heroSchema.validate(hero);
      return isNil(error) ? Ok(hero) : Err(error);
    },
    canHandleTheThreat(heroData, theatLvl) {
      return heroData.powerLevel >= theatLvl;
    },
  };
};
