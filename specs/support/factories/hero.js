const { chance, getRandomIndex } = require('src/infra/support/dataFaker.js');
const { toObjectOptions } = require('src/infra/mongoose/utils');

const superPowers = [
  'Regenerative Healing Factor',
  'Claw Retraction',
  'Self-Detonation',
  'Fire Breath',
  'Aerial Adaptation',
];

const weapons = [
  'Astral Hammer',
];

const powerLevel = ['S', 'A', 'B', 'C', 'D'];

/**
 * @param {object} factory A factory instance
 * @param {object} models
 * @property {object} Hero A model
 */
module.exports = (factory, { Hero }) => {
  factory.define('hero', Hero, {
    name: chance.name(),
    superPowers: [getRandomIndex(superPowers)],
    powerLevel: getRandomIndex(powerLevel),
    weapon: getRandomIndex(weapons),
    baseOperations: chance.city(),
  }, {
    afterCreate: (model) => model.toObject(toObjectOptions()),
  });
  return factory;
};
