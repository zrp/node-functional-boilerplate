const env = require('env-var');
const apollo = require('./apollo');
const express = require('./express');
const mongoDb = require('./mongoDb');

const nodeEnv = env.get('NODE_ENV').required().asString();
const appIdentifier = env.get('APP_IDENTIFIER').required().asString();

module.exports = {
  apollo,
  express,
  mongoDb,
  nodeEnv,
  appIdentifier,
};
