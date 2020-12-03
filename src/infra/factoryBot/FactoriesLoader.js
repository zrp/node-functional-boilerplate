/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const loadFactories = (baseFolder) => fs
  .readdirSync(baseFolder)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'));

/**
 *
 * @param {object}
 * @property {object} factoryBot An factory instance
 * @property {object} models Database models
 * @property {string} baseFolder Factories base folder location
 * @returns {object} Updated factory instance
 */
const load = ({
  factoryBot,
  models,
  baseFolder,
}) => {
  // eslint-disable-next-line fp/no-unused-expression
  loadFactories(baseFolder)
    .map((file) => {
      const factoryPath = path.join(baseFolder, file);
      const definedFactory = require(factoryPath);
      return definedFactory(factoryBot, models);
    });

  return factoryBot;
};

module.exports = {
  factoriesLoader: load,
};
