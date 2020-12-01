const resultToAsync = require('crocks/Async/resultToAsync');
const { createOperationOutput } = require('../utils');

const CreateHero = ({ heroDomainFactory, heroDomainService, heroRepository }) => (
  heroData,
) => resultToAsync(heroDomainFactory(heroData)
  .map(heroDomainService.addSuperPower('super strength')))
  .chain(heroRepository.add)
  .bimap((err) => console.log(err), (result) => console.log(result))
  .bichain(createOperationOutput, createOperationOutput);

module.exports = CreateHero;
