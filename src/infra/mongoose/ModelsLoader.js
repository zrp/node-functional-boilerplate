/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-nil */
const fs = require('fs');
const path = require('path');

module.exports = {
  load({ db, baseFolder, indexFile = 'index.js' }) {
    const loaded = {};
    // eslint-disable-next-line fp/no-unused-expression
    fs
      .readdirSync(baseFolder)
      .filter((file) => (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        const model = require(path.join(baseFolder, file)); /* eslint-disable-line */
        const modelName = file.split('.')[0];
        loaded[modelName] = model;
      });

    // eslint-disable-next-line fp/no-mutation
    loaded.database = db;
    return loaded;
  },
};
