const Async = require('crocks/Async');
const resultToAsync = require('crocks/Async/resultToAsync');

const { Resolved } = Async;

module.exports = ({
  heroDomain,
  heroRepository,
}) => (hero) => Resolved(hero)
  .chain(resultToAsync(heroDomain.validate))
  .chain(heroRepository.add);
