const chance = require('chance').Chance();

const getRandomIndex = (array) => array[chance.integer({
  min: 0,
  max: array.length - 1,
})];

module.exports = {
  chance,
  getRandomIndex,
};
