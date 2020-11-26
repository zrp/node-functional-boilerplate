const mongoose = require('mongoose');
const { mongoDb } = require('config/index');
const { ModelsLoader } = require('../../mongoose');

if (mongoDb.url) {
  const db = mongoose;

  module.exports = ModelsLoader.load({
    db,
    baseFolder: __dirname,
  });
} else {
  /* eslint-disable-next-line fp/no-unused-expression, no-console */
  console.error('Database config file not found, disabling database.');
}
