const resultToAsync = require('crocks/Async/resultToAsync');
const { createOperationOutput } = require('../utils');

const CreateHero = ({ heroDomainFactory, heroDomainService, heroRepository }) => (
  heroData,
) => resultToAsync(heroDomainFactory(heroData)
  .map(heroDomainService('super strength')))
  .chain(heroRepository.add)
  .bimap(createOperationOutput, createOperationOutput);

module.exports = CreateHero;
