const { chance, getRandomIndex } = require('src/infra/support/dataFaker.js');

const mongooseToObjectOptions = () => ({
  getters: true,
  virtuals: false,
  minimize: false,
  versionKey: false,
  /* eslint-disable no-underscore-dangle, no-param-reassign */
  transform: (doc, ret) => {
    if (ret._id) {
      ret.id = ret._id.toString();
      delete ret._id;
    }
    return ret;
  },
  /* eslint-enable no-underscore-dangle, no-param-reassign */
});

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
    afterCreate: (model) => model.toObject(mongooseToObjectOptions()),
  });
  return factory;
};
