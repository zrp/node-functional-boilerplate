const Async = require('crocks/Async');
const resultToAsync = require('crocks/Async/resultToAsync');

const { Resolved } = Async;

module.exports = ({
  heroDomainFactory,
  heroDomainService,
  heroRepository,
}) => (heroData) => {
  const { validateHero } = heroDomainService;

  return Resolved(heroDomainFactory(heroData))
    .chain(resultToAsync(validateHero))
    .chain(heroRepository.add);
};
