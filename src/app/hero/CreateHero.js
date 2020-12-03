const resultToAsync = require('crocks/Async/resultToAsync');
const { buildError, buildSuccess } = require('../utils');

const CreateHero = ({ heroDomainFactory, heroDomainService, heroRepository }) => (
  heroData,
) => resultToAsync(heroDomainFactory(heroData)
  .map(heroDomainService.addSuperPower('super strength')))
  .chain(heroRepository.add)
  .bimap(buildError, buildSuccess);

module.exports = CreateHero;
