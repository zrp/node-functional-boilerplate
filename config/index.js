const env = require('env-var');
const apollo = require('./apollo');
const express = require('./express');
const mongoDb = require('./mongoDb');
const slack = require('./slack');

const nodeEnv = env.get('NODE_ENV').required().asString();
const machineHost = env.get('MACHINE_HOST').required().asString();

module.exports = {
  apollo,
  express,
  mongoDb,
  slack,
  nodeEnv,
  machineHost,
};
