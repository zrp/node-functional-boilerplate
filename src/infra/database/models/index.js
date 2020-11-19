const mongoose = require('mongoose');
const { ModelsLoader } = require('../../mongoose/');

if (process.env.MONGO_DB_URL) {
  const db = mongoose;

  module.exports = ModelsLoader.load({
    db,
    baseFolder: __dirname,
  });
} else {
  /* eslint-disable no-console */
  // eslint-disable-next-line fp/no-unused-expression
  console.error('Database config file not found, disabling database.');
  /* eslint-enable no-console */
}
