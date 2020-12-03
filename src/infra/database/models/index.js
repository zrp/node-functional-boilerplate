const db = require('mongoose');
const { ModelsLoader } = require('../../mongoose');

const loader = () => ModelsLoader.load({
  db,
  baseFolder: __dirname,
});

module.exports = loader();
