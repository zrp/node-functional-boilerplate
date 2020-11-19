const Hero = require('./Hero.module');
const validate = require('../utils/validate');

const addSuperPower = (domain, newSuperPower) => {
  const newSuperPowers = [...domain.superPowers, newSuperPower];
  return {
    ...domain,
    superPowers: newSuperPowers,
  };
};

module.exports = {
  validateHero: validate(Hero),
  addSuperPower,
};
