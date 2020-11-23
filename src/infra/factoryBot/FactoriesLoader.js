/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const loadFactories = ({ baseFolder }) => fs
  .readdirSync(baseFolder)
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'));

const load = ({ factoryBot }) => ({ models }) => ({ baseFolder }) => loadFactories
  .map((file) => {
    const factoryPath = path.join(baseFolder, file);
    const definedFactory = require(factoryPath);
    return definedFactory(factoryBot, models);
  });

module.exports = {
  factoriesLoader: load,
};
