const chance = require('chance').Chance();
const getProp = require('crocks/Maybe/getProp');

const getRandomIndexFactory = (getRandomInteger) => (array) => array[chance.integer({
  min: 0,
  max: array.length - 1,
})];

const safeChance = (prop) => getProp(prop)(chance);

// TODO use safeChance
const getRandomIndex = getRandomIndexFactory(safeChance('integer'));

module.exports = {
  safeChance,
  getRandomIndex,
};
