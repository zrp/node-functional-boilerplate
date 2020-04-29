const EnumsEntity = require('./Enums.module');
const { HeroDomainFactory, createHeroDomainValidate } = require('./Hero.module');
const HeroDomainService = require('./Hero.service');

module.exports = {
  EnumsEntity,
  HeroDomainService,
  HeroDomainFactory,
  createHeroDomainValidate,
};
