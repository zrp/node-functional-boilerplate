const GetHero = ({
  heroRepository,
}) => (heroId) => heroRepository.getOne(heroId);

module.exports = GetHero;
