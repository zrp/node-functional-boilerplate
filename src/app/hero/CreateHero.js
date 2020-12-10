const resultToAsync = require('crocks/Async/resultToAsync');
const { buildError, buildSuccess } = require('../utils');

const CreateHero = ({
  heroDomainFactory,
  heroDomainService,
  heroRepository,
}) => (
  tenantId,
  heroData,
) => resultToAsync(heroDomainFactory(heroData)
  .map(heroDomainService.addSuperPower('super strength')))
  .chain(heroRepository(tenantId).add)
  .bimap(buildError, buildSuccess);

module.exports = CreateHero;
