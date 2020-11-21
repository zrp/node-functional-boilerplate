const path = require('path');
const { factory, MongooseAdapter } = require('factory-bot');
const { factoriesLoader } = require('src/infra/factoryBot');
const models = require('src/infra/database/models/');

factory.setAdapter(new MongooseAdapter());

const baseFolder = path.join(__dirname, 'factories');

module.exports = factoriesLoader({ models })({ baseFolder });
