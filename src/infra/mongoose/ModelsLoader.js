/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-nil */
const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Load all models in an specific folder
   *
   * @param {object}
   * @property {object} db A mongoose instance
   * @property {string} baseFolder Current folder containing the models
   * @property {string} indexFile Index file name in models folders
   * @returns {object}
   */
  load({
    db,
    baseFolder,
    indexFile = 'index.js',
  }) {
    const isModel = (fileName) => fileName !== indexFile && fileName.endsWith('.js');

    const loaded = {};

    // eslint-disable-next-line fp/no-unused-expression
    fs
      .readdirSync(baseFolder)
      .filter(isModel)
      .forEach((fileName) => {
        const model = require(path.join(baseFolder, fileName)); /* eslint-disable-line */
        const [modelName] = fileName.split('.');
        loaded[modelName] = model;
      });

    return {
      database: db,
      ...loaded,
    };
  },
};
