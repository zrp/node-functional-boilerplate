const { safeChance, getRandomIndex } = require('src/infra/support/dataFaker.js');

const superPowers = [
  'Regenerative Healing Factor',
  'Claw Retraction',
  'Self-Detonation',
  'Fire Breath',
  'Aerial Adaptation',
];

const weapons = [
  'Short Sword',
  'Power Bow',
  'Astral Hammer',
];

const powerLevel = ['S', 'A', 'B', 'C', 'D'];

module.exports = (factory, { Hero }) => {
  factory.define('hero', Hero, {
    name: safeChance('name'),
    superPower: getRandomIndex(superPowers),
    powerLevel: getRandomIndex(powerLevel),
    weapon: getRandomIndex(weapons),
    baseOperations: safeChance('city'),
  });
  return factory;
};
