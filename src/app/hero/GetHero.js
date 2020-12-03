const { buildError, buildSuccess } = require('../utils');

const GetHero = ({
  heroRepository,
}) => (heroId) => heroRepository.getOne(heroId).bimap(buildError, buildSuccess);

module.exports = GetHero;
