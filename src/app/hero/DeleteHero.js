const resultToAsync = require('crocks/Async/resultToAsync');
const { buildError, buildSuccess } = require('../utils');

const DeleteHero = ({ heroDomainFactory, heroDomainService, heroRepository }) => (
  heroData,
) => resultToAsync(heroDomainFactory(heroData)
  .map(heroDomainService.addSuperPower('super strength')))
  .chain(heroRepository.updateOne)
  .bimap(buildError, buildSuccess);

module.exports = DeleteHero;
