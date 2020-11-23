const path = require('path');
const { factory, MongooseAdapter } = require('factory-bot');
const { factoriesLoader } = require('src/infra/factoryBot/FactoriesLoader');
const models = require('src/infra/database/models/');

factory.setAdapter(new MongooseAdapter());

const baseFolder = path.join(__dirname, 'factories');

module.exports = factoriesLoader({ factoryBot: factory })({ models })({ baseFolder });
