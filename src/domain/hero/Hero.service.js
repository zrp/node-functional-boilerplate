const Result = require('crocks/Result');
const getPropOr = require('crocks/helpers/getPropOr');
const validateUtil = require('../utils/validate');
const { PowerLevels } = require('./Enums.module');

const { Err, Ok } = Result;

const validations = {
  hasAstralHammer(domain) {
    const result = domain.weapon === 'Astral Hammer';
    return (result)
      ? Ok(domain)
      : Err('Don\'t have the Astral Hammer');
  },
  hasCorrectPowerLevel(domain) {
    const { powerLevel } = domain;
    const hasPowerLevel = getPropOr(false)(powerLevel, PowerLevels);
    return (hasPowerLevel)
      ? Ok(domain)
      : Err('Invalid power level');
  },
};

const validateHero = validateUtil(Object.values(validations));

const addSuperPower = (domain, newSuperPower) => {
  const newSuperPowers = [...domain.superPowers, newSuperPower];
  return {
    ...domain,
    superPowers: newSuperPowers,
  };
};


module.exports = {
  validateHero,
  addSuperPower,
  validations,
};
