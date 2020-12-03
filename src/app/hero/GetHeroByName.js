const { buildError, buildSuccess } = require('../utils');

const GetHeroByName = ({
  heroRepository,
}) => (heroName) => heroRepository.getOne(heroName).bimap(buildError, buildSuccess);

module.exports = GetHeroByName;
