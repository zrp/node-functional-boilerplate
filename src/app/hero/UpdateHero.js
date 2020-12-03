const resultToAsync = require('crocks/Async/resultToAsync');
const { buildError, buildSuccess } = require('../utils');

const UpdateHero = ({ heroDomainFactory, heroDomainService, heroRepository }) => (
  heroData, id,
) => resultToAsync(heroDomainFactory(id, heroData)
  .map(heroDomainService.addSuperPower('super strength')))
  .chain(heroRepository.updateOne)
  .bimap(buildError, buildSuccess);

module.exports = UpdateHero;
