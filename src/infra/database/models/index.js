const mongoose = require('mongoose');
const { ModelsLoader } = require('../../mongoose/');

if (process.env.DB_MONGO_URL) {
  const db = mongoose;

  module.exports = ModelsLoader.load({
    db,
    baseFolder: __dirname,
  });
} else {
  /* eslint-disable no-console */
  console.error('Database config file log found, disabling database.');
  /* eslint-enable no-console */
}
